import os
import re
import sys
import json
import uuid
import datetime
import subprocess

# Base directories
data_dir = r"d:\WORK\IEEE\SB\ieeeweb\main\lib\data"
supabase_dir = r"d:\WORK\IEEE\SB\ieeeweb\admin\Supabase"

# Placeholder Cloudinary image URL
PLACEHOLDER_URL = "https://res.cloudinary.com/djsime0yn/image/upload/v1779484601/kla4bkjx0zr1dvdghtnb.jpg"

# 1. Update events.ts image paths in-place
events_ts_path = os.path.join(data_dir, "events.ts")
print(f"Reading and updating image paths in {events_ts_path}...")
with open(events_ts_path, "r", encoding="utf-8") as f:
    events_ts_content = f.read()

# Replace any local or other image URL inside events.ts with the placeholder URL
# Matches image: "something" or image: 'something'
updated_content = re.sub(
    r'(image\s*:\s*)(["\'])(.*?)\2',
    f'\\1"{PLACEHOLDER_URL}"',
    events_ts_content
)

with open(events_ts_path, "w", encoding="utf-8") as f:
    f.write(updated_content)
print("events.ts updated in-place.")

# 2. Extract events from events.ts using a temporary node script
print("Extracting events from events.ts...")
try:
    with open(os.path.join(data_dir, "events.ts"), "r", encoding="utf-8") as f:
        events_ts = f.read()
    parts = events_ts.split("export const events")
    if len(parts) < 2:
        raise ValueError("Could not find 'export const events' in events.ts")
    events_js = "const events" + parts[1]
    events_js = events_js.replace(": Event[] =", " =").replace(": Event[]=", "=")
    events_js += "\nconsole.log(JSON.stringify(events));\n"
    
    temp_js_path = os.path.join(data_dir, "temp_events.js")
    with open(temp_js_path, "w", encoding="utf-8") as f:
        f.write(events_js)
        
    cmd_events = ["node", "temp_events.js"]
    result_events = subprocess.run(cmd_events, cwd=data_dir, capture_output=True, text=True, check=True, shell=True)
    events_data = json.loads(result_events.stdout)
    
    if os.path.exists(temp_js_path):
        os.remove(temp_js_path)
except Exception as e:
    print(f"Error extracting events: {e}")
    if 'result_events' in locals() and result_events.stderr:
        print(f"Node error: {result_events.stderr}")
    sys.exit(1)

print(f"Successfully extracted {len(events_data)} events.")

# 3. Extract announcements from announcements.ts using a temporary node script
print("Extracting announcements from announcements.ts...")
try:
    with open(os.path.join(data_dir, "announcements.ts"), "r", encoding="utf-8") as f:
        ann_ts = f.read()
    parts = ann_ts.split("export const announcements")
    if len(parts) < 2:
        raise ValueError("Could not find 'export const announcements' in announcements.ts")
    ann_js = "const announcements" + parts[1]
    ann_js = ann_js.replace(": Announcement[] =", " =").replace(": Announcement[]=", "=")
    ann_js += "\nconsole.log(JSON.stringify(announcements));\n"
    
    temp_js_path = os.path.join(data_dir, "temp_announcements.js")
    with open(temp_js_path, "w", encoding="utf-8") as f:
        f.write(ann_js)
        
    cmd_announcements = ["node", "temp_announcements.js"]
    result_announcements = subprocess.run(cmd_announcements, cwd=data_dir, capture_output=True, text=True, check=True, shell=True)
    announcements_data = json.loads(result_announcements.stdout)
    
    if os.path.exists(temp_js_path):
        os.remove(temp_js_path)
except Exception as e:
    print(f"Error extracting announcements: {e}")
    if 'result_announcements' in locals() and result_announcements.stderr:
        print(f"Node error: {result_announcements.stderr}")
    sys.exit(1)

print(f"Successfully extracted {len(announcements_data)} announcements.")

# Helper functions for SQL generation
def escape_sql(text):
    if text is None:
        return "NULL"
    return "'" + str(text).replace("'", "''") + "'"

def parse_date(date_str):
    if not date_str:
        return None
    cleaned = re.sub(r'(\d+)-\d+', r'\1', date_str)
    for fmt in ("%B %d, %Y", "%b %d, %Y", "%d %B %Y", "%Y-%m-%d"):
        try:
            dt = datetime.datetime.strptime(cleaned.strip(), fmt)
            return dt.strftime("%Y-%m-%d %H:%M:%S+00")
        except ValueError:
            continue
    year_match = re.search(r'\b(202\d)\b', date_str)
    if year_match:
        return f"{year_match.group(1)}-01-01 00:00:00+00"
    return None

# Generate Seed SQL statements
sql_statements = []
sql_statements.append("-- Generated seed for events and announcements using the placeholder image URL")
sql_statements.append("BEGIN;")

# A. Insert Events
sql_statements.append("\n-- 1. Seed Events")
for event in events_data:
    event_slug = event["id"]
    event_uuid = str(uuid.uuid5(uuid.NAMESPACE_DNS, f"event-{event_slug}"))
    title = event["title"]
    description = event.get("description", "")
    
    # Use the placeholder URL
    main_poster_url = PLACEHOLDER_URL
    
    status_str = event.get("status", "Completed")
    if status_str in ("Upcoming", "Registration Open", "Open"):
        status_val = "open"
    elif status_str == "Closed":
        status_val = "closed"
    else:
        status_val = "completed"
        
    raw_date = event.get("date", "")
    parsed_date = parse_date(raw_date)
    date_val = f"'{parsed_date}'" if parsed_date else "NULL"
    
    venue_val = escape_sql(event.get("venue"))
    
    sql_statements.append(f"""INSERT INTO public.events (id, title, slug, description, main_poster_url, status, event_date, venue)
VALUES ('{event_uuid}', {escape_sql(title)}, {escape_sql(event_slug)}, {escape_sql(description)}, {escape_sql(main_poster_url)}, '{status_val}'::public.event_status, {date_val}, {venue_val})
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  main_poster_url = EXCLUDED.main_poster_url,
  status = EXCLUDED.status,
  event_date = EXCLUDED.event_date,
  venue = EXCLUDED.venue;""")

# B. Insert Announcements
sql_statements.append("\n-- 2. Seed Announcements")
for ann in announcements_data:
    ann_slug = ann["id"]
    ann_uuid = str(uuid.uuid5(uuid.NAMESPACE_DNS, f"announcement-{ann_slug}"))
    title = ann["title"]
    description = ann["description"]
    image_url = PLACEHOLDER_URL
    display_order = ann.get("order", 0)
    
    raw_date = ann.get("date", "")
    parsed_date = parse_date(raw_date)
    date_val = f"'{parsed_date}'" if parsed_date else "NULL"
    
    sql_statements.append(f"""INSERT INTO public.announcements (id, title, slug, description, image_url, announcement_date, display_order)
VALUES ('{ann_uuid}', {escape_sql(title)}, {escape_sql(ann_slug)}, {escape_sql(description)}, {escape_sql(image_url)}, {date_val}, {display_order})
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url,
  announcement_date = EXCLUDED.announcement_date,
  display_order = EXCLUDED.display_order;""")

sql_statements.append("\nCOMMIT;")

# Write SQL seed to migrations
migrations_dir = os.path.join(supabase_dir, "migrations")
os.makedirs(migrations_dir, exist_ok=True)
seed_migration_path = os.path.join(migrations_dir, "20260523000006_seed_events_and_announcements.sql")

with open(seed_migration_path, "w", encoding="utf-8") as f:
    f.write("\n".join(sql_statements))

print(f"Successfully generated seed migration at {seed_migration_path}")
