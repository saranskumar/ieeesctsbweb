import os
import re
import uuid

# Base directories
data_dir = r"d:\WORK\IEEE\SB\ieeeweb\main\lib\data"
supabase_dir = r"d:\WORK\IEEE\SB\ieeeweb\admin\Supabase"

# 1. Parse members.ts
members_path = os.path.join(data_dir, "members.ts")
with open(members_path, "r", encoding="utf-8") as f:
    members_content = f.read()

# Parse all member blocks
# Indentation is exactly 4 spaces for member key definitions
member_blocks = {}
current_key = None
current_block_lines = []
in_members = False

for line in members_content.splitlines():
    if "export const members: Record<string, MemberProfile> = {" in line:
        in_members = True
        continue
    if in_members:
        # Check for start of a member block
        start_match = re.match(r'^    "([a-zA-Z0-9_-]+)":\s*\{', line)
        if start_match:
            current_key = start_match.group(1)
            current_block_lines = []
            continue
        # Check for end of member block
        if current_key and re.match(r'^    \},', line):
            member_blocks[current_key] = "\n".join(current_block_lines)
            current_key = None
            continue
        if current_key:
            current_block_lines.append(line)

members_data = {}
for m_key, m_block in member_blocks.items():
    # Extract fields
    id_match = re.search(r'id:\s*["\']([^"\']+)["\']', m_block)
    name_match = re.search(r'name:\s*["\']([^"\']+)["\']', m_block)
    image_match = re.search(r'image:\s*["\']([^"\']+)["\']', m_block)
    dept_match = re.search(r'department:\s*["\']([^"\']+)["\']', m_block)
    batch_match = re.search(r'batch:\s*["\']([^"\']+)["\']', m_block)
    linkedin_match = re.search(r'linkedin:\s*["\']([^"\']+)["\']', m_block)
    github_match = re.search(r'github:\s*["\']([^"\']+)["\']', m_block)
    email_match = re.search(r'email:\s*["\']([^"\']+)["\']', m_block)
    bio_match = re.search(r'bio:\s*["\']([^"\']+)["\']', m_block)
    
    m_id = id_match.group(1) if id_match else m_key
    name = name_match.group(1) if name_match else m_id.replace("-", " ").title()
    image = image_match.group(1) if image_match else "/person.svg"
    dept = dept_match.group(1) if dept_match else None
    batch = batch_match.group(1) if batch_match else None
    linkedin = linkedin_match.group(1) if linkedin_match else None
    github = github_match.group(1) if github_match else None
    email = email_match.group(1) if email_match else f"{m_id}@ieee-sct-sb.org"
    bio = bio_match.group(1) if bio_match else None
    
    members_data[m_id] = {
        'id': m_id,
        'name': name,
        'image': image,
        'department': dept,
        'batch': batch,
        'linkedin': linkedin,
        'github': github,
        'email': email,
        'bio': bio
    }

# 2. Parse yearly teams
years = ["2020", "2021", "2022", "2023", "2024", "2025"]
team_entries = []

for yr in years:
    team_file = os.path.join(data_dir, f"team{yr[2:]}.ts")
    if not os.path.exists(team_file):
        continue
    
    with open(team_file, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Parse all TeamEntry objects: { id: "...", memberId: "...", role: "..." }
    entry_pattern = r'\{\s*id:\s*["\']([^"\']+)["\']\s*,\s*memberId:\s*["\']([^"\']+)["\']\s*,\s*role:\s*["\']([^"\']+)["\']\s*\}'
    matches = re.findall(entry_pattern, content)
    
    for idx, (slot_id, member_id, role) in enumerate(matches):
        team_entries.append({
            'year': yr,
            'slot_id': slot_id,
            'member_id': member_id,
            'role': role,
            'display_order': idx
        })

# Helper to escape values for SQL statements safely
def sql_val(val):
    if val is None:
        return "NULL"
    return "'" + str(val).replace("'", "''") + "'"

# 3. Classify Roles
faculty_ids = {
    "deepa-ak", "sandhya-l", "lakshmi-vs", "rejimol-robinson", "sajith-sethu", "baji-k",
    "asha-s", "bobby-philp", "soniya-b", "kutty-maalu-vk", "chithrakumar-vk"
}

# Scan profiles for "/faculty/" in image
for m_id, m in members_data.items():
    if m['image'] and "/faculty/" in m['image']:
        faculty_ids.add(m_id)

# Scan team entries for role strings indicating faculty
for entry in team_entries:
    r = entry['role'].lower()
    if "advisor" in r or "counselor" in r:
        faculty_ids.add(entry['member_id'])

# Execom (Active) IDs - active in 2025
active_ids = set()
for entry in team_entries:
    if entry['year'] == "2025":
        active_ids.add(entry['member_id'])

def get_user_role(m_id):
    if m_id in faculty_ids:
        return "faculty"
    if m_id in active_ids:
        return "execom"
    return "old_member"

# Generate seed SQL content
sql = []
sql.append("-- IEEE SCT SB Database Seed File")
sql.append("-- Generated automatically by generate_seed.py")
sql.append("BEGIN;")

sql.append("\n-- 1. Insert Team Years")
# Make 2025 the active year by default, and others inactive
for yr in years:
    active_val = "true" if yr == "2025" else "false"
    year_range = f"{yr}-{int(yr)+1}"
    # Generate deterministic UUID for each year
    year_uuid = str(uuid.uuid5(uuid.NAMESPACE_DNS, f"year-{yr}"))
    sql.append(f"INSERT INTO public.team_years (id, year, is_active) VALUES ('{year_uuid}', '{year_range}', {active_val}) ON CONFLICT (year) DO UPDATE SET is_active = EXCLUDED.is_active;")

all_users_roles = {}

sql.append("\n-- 2. Insert users and profiles")
for m_id, m in members_data.items():
    user_uuid = str(uuid.uuid5(uuid.NAMESPACE_DNS, f"member-{m_id}"))
    esc_name = m['name'].replace("'", "''")
    esc_email = m['email'].replace("'", "''")
    role = get_user_role(m_id)
    all_users_roles[user_uuid] = role
    
    # Insert into auth.users (to satisfy Supabase foreign key constraints)
    esc_image = m['image'].replace("'", "''") if m['image'] else "/person.svg"
    sql.append(f"INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role) VALUES ('{user_uuid}', '{esc_email}', '{{\"name\": \"{esc_name}\", \"role\": \"{role}\", \"avatar_url\": \"{esc_image}\"}}', 'authenticated', 'authenticated') ON CONFLICT (id) DO NOTHING;")
    
    # Ensure public.users row matches
    sql.append(f"INSERT INTO public.users (id, email, name, role) VALUES ('{user_uuid}', '{esc_email}', '{esc_name}', '{role}'::public.user_role) ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, email = EXCLUDED.email, role = EXCLUDED.role;")
    
    # Update/Insert public.profiles
    username = m_id
    sql.append(f"INSERT INTO public.profiles (id, username, name, image_url, department, batch, bio, linkedin_url, github_url) VALUES ('{user_uuid}', '{username}', '{esc_name}', {sql_val(m['image'])}, {sql_val(m['department'])}, {sql_val(m['batch'])}, {sql_val(m['bio'])}, {sql_val(m['linkedin'])}, {sql_val(m['github'])}) ON CONFLICT (id) DO UPDATE SET username = EXCLUDED.username, name = EXCLUDED.name, image_url = EXCLUDED.image_url, department = EXCLUDED.department, batch = EXCLUDED.batch, bio = EXCLUDED.bio, linkedin_url = EXCLUDED.linkedin_url, github_url = EXCLUDED.github_url;")

sql.append("\n-- 3. Insert Team Entries")
for idx, entry in enumerate(team_entries):
    slot_uuid = str(uuid.uuid5(uuid.NAMESPACE_DNS, f"entry-{entry['slot_id']}"))
    year_uuid = str(uuid.uuid5(uuid.NAMESPACE_DNS, f"year-{entry['year']}"))
    
    # Check if member exists in our members_data dictionary
    m_id = entry['member_id']
    if m_id not in members_data:
        # Create a stub member if not in members.ts
        user_uuid = str(uuid.uuid5(uuid.NAMESPACE_DNS, f"member-{m_id}"))
        esc_name = m_id.replace("-", " ").title().replace("'", "''")
        esc_email = f"{m_id}@ieee-sct-sb.org"
        role = get_user_role(m_id)
        all_users_roles[user_uuid] = role
        
        sql.append(f"INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role) VALUES ('{user_uuid}', '{esc_email}', '{{\"name\": \"{esc_name}\", \"role\": \"{role}\", \"avatar_url\": \"/person.svg\"}}', 'authenticated', 'authenticated') ON CONFLICT (id) DO NOTHING;")
        sql.append(f"INSERT INTO public.users (id, email, name, role) VALUES ('{user_uuid}', '{esc_email}', '{esc_name}', '{role}'::public.user_role) ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, role = EXCLUDED.role;")
        username = m_id
        sql.append(f"INSERT INTO public.profiles (id, username, name, image_url) VALUES ('{user_uuid}', '{username}', '{esc_name}', '/person.svg') ON CONFLICT (id) DO NOTHING;")
    else:
        user_uuid = str(uuid.uuid5(uuid.NAMESPACE_DNS, f"member-{m_id}"))
        
    esc_role = entry['role'].replace("'", "''")
    sql.append(f"INSERT INTO public.team_entries (id, team_year_id, user_id, role, display_order) VALUES ('{slot_uuid}', '{year_uuid}', '{user_uuid}', '{esc_role}', {entry['display_order']}) ON CONFLICT (id) DO UPDATE SET role = EXCLUDED.role, display_order = EXCLUDED.display_order;")

sql.append("\nCOMMIT;")

# Write seed.sql
os.makedirs(supabase_dir, exist_ok=True)
seed_sql_path = os.path.join(supabase_dir, "seed.sql")
with open(seed_sql_path, "w", encoding="utf-8") as f:
    f.write("\n".join(sql))

# Write to migrations/20260523000002_seed_team_data.sql as well
migration_seed_path = os.path.join(supabase_dir, "migrations", "20260523000002_seed_team_data.sql")
with open(migration_seed_path, "w", encoding="utf-8") as f:
    f.write("\n".join(sql))

# Write update migration for existing seeded users
migrations_dir = os.path.join(supabase_dir, "migrations")
os.makedirs(migrations_dir, exist_ok=True)
update_roles_migration_path = os.path.join(migrations_dir, "20260523000004_update_seeded_roles.sql")

update_sql = []
update_sql.append("-- Migration: Update existing seeded user roles dynamically")
update_sql.append("BEGIN;")

for u_uuid, role in all_users_roles.items():
    update_sql.append(f"UPDATE public.users SET role = '{role}'::public.user_role WHERE id = '{u_uuid}';")
    update_sql.append(f"UPDATE auth.users SET raw_user_meta_data = COALESCE(raw_user_meta_data, '{{}}'::jsonb) || '{{\"role\": \"{role}\"}}'::jsonb WHERE id = '{u_uuid}';")

update_sql.append("COMMIT;")

with open(update_roles_migration_path, "w", encoding="utf-8") as f:
    f.write("\n".join(update_sql))

print(f"seed.sql and 20260523000004_update_seeded_roles.sql generated successfully with {len(members_data)} members and {len(team_entries)} team entries.")

