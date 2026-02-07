import { ImageResponse } from 'next/og';
import fs from 'fs';
import path from 'path';

export const runtime = 'nodejs';

// Image metadata
export const size = {
    width: 32,
    height: 32,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
    // Read the favicon image from the public directory
    const imagePath = path.join(process.cwd(), 'public', 'favicon.png');
    const file = fs.readFileSync(imagePath);
    const imageSrc = `data:image/png;base64,${file.toString('base64')}`;

    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    fontSize: 24,
                    background: 'transparent',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    overflow: 'hidden',
                }}
            >
                <img
                    src={imageSrc}
                    alt="Favicon"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                />
            </div>
        ),
        {
            // For convenience, we can re-use the exported icons size metadata
            // config to also set the ImageResponse's width and height.
            ...size,
        }
    );
}
