"use client";
import React, { useEffect, useState, useRef, useId, useMemo } from 'react';
import './glass.css';

// Re-using the presets from previous implementation to maintain compatibility
const GLASS_PRESETS = {
    subtle: {
        backgroundOpacity: 0.06,
        saturation: 1.1,
        brightness: 55,
        blur: 8,
        displace: 0.3,
        distortionScale: -80,
        redOffset: -2,
        greenOffset: 6,
        blueOffset: 12,
        mixBlendMode: "difference",
    },
    default: {
        backgroundOpacity: 0.1,
        saturation: 1.4,
        brightness: 55,
        blur: 10,
        displace: 0.5,
        distortionScale: -160,
        redOffset: 0,
        greenOffset: 8,
        blueOffset: 16,
        mixBlendMode: "difference",
    },
    bold: {
        backgroundOpacity: 0.18,
        saturation: 1.8,
        brightness: 60,
        blur: 12,
        displace: 0.8,
        distortionScale: -240,
        redOffset: 6,
        greenOffset: 12,
        blueOffset: 24,
        mixBlendMode: "screen",
    },
    ghost: {
        backgroundOpacity: 0,
        saturation: 1,
        brightness: 55,
        blur: 6,
        displace: 0,
        distortionScale: 0,
        redOffset: 0,
        greenOffset: 0,
        blueOffset: 0,
        mixBlendMode: "difference",
    },
};

type GlassVariant = keyof typeof GLASS_PRESETS;

export interface GlassProps {
    children?: React.ReactNode;
    width?: number | string;
    height?: number | string;
    borderRadius?: number;
    borderWidth?: number;
    brightness?: number;
    opacity?: number;
    blur?: number;
    displace?: number;
    backgroundOpacity?: number;
    saturation?: number;
    distortionScale?: number;
    redOffset?: number;
    greenOffset?: number;
    blueOffset?: number;
    xChannel?: string;
    yChannel?: string;
    mixBlendMode?: string;
    className?: string;
    style?: React.CSSProperties;
    variant?: GlassVariant; // Added for backward compatibility
}

export const Glass: React.FC<GlassProps> = (props) => {
    const { variant } = props;

    // Merge preset values if variant is provided
    const preset = variant ? GLASS_PRESETS[variant] : {};

    const {
        children,
        width, // Allow auto width by default if not set
        height,
        borderRadius = 20,
        borderWidth = 0.07,
        brightness = 50,
        opacity = 0.93,
        blur = 11,
        displace = 0,
        backgroundOpacity = 0,
        saturation = 1,
        distortionScale = -180,
        redOffset = 0,
        greenOffset = 10,
        blueOffset = 20,
        xChannel = 'R',
        yChannel = 'G',
        mixBlendMode = 'difference',
        className = '',
        style = {}
    } = { ...props, ...preset, ...props }; // Props override preset

    const uniqueId = useId().replace(/:/g, '-');
    const filterId = `glass-filter-${uniqueId}`;
    const redGradId = `red-grad-${uniqueId}`;
    const blueGradId = `blue-grad-${uniqueId}`;

    const [svgSupported, setSvgSupported] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const feImageRef = useRef<SVGFEImageElement>(null);
    const redChannelRef = useRef<SVGFEDisplacementMapElement>(null);
    const greenChannelRef = useRef<SVGFEDisplacementMapElement>(null);
    const blueChannelRef = useRef<SVGFEDisplacementMapElement>(null);
    const gaussianBlurRef = useRef<SVGFEGaussianBlurElement>(null);


    const generateDisplacementMap = () => {
        const rect = containerRef.current?.getBoundingClientRect();
        const actualWidth = rect?.width || 400;
        const actualHeight = rect?.height || 200;
        const edgeSize = Math.min(actualWidth, actualHeight) * (borderWidth * 0.5);

        const svgContent = `
      <svg viewBox="0 0 ${actualWidth} ${actualHeight}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${redGradId}" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="#0000"/>
            <stop offset="100%" stop-color="red"/>
          </linearGradient>
          <linearGradient id="${blueGradId}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#0000"/>
            <stop offset="100%" stop-color="blue"/>
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" fill="black"></rect>
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" rx="${borderRadius}" fill="url(#${redGradId})" />
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" rx="${borderRadius}" fill="url(#${blueGradId})" style="mix-blend-mode: ${mixBlendMode}" />
        <rect x="${edgeSize}" y="${edgeSize}" width="${actualWidth - edgeSize * 2}" height="${actualHeight - edgeSize * 2}" rx="${borderRadius}" fill="hsl(0 0% ${brightness}% / ${opacity})" style="filter:blur(${blur}px)" />
      </svg>
    `;

        return `data:image/svg+xml,${encodeURIComponent(svgContent)}`;
    };

    const updateDisplacementMap = () => {
        if (feImageRef.current) {
            feImageRef.current.setAttribute('href', generateDisplacementMap());
        }
    };

    useEffect(() => {
        updateDisplacementMap();
        [
            { ref: redChannelRef, offset: redOffset },
            { ref: greenChannelRef, offset: greenOffset },
            { ref: blueChannelRef, offset: blueOffset }
        ].forEach(({ ref, offset }) => {
            if (ref.current) {
                // @ts-ignore
                ref.current.setAttribute('scale', (distortionScale + offset).toString());
                ref.current.setAttribute('xChannelSelector', xChannel);
                ref.current.setAttribute('yChannelSelector', yChannel);
            }
        });

        if (gaussianBlurRef.current) {
            // @ts-ignore
            gaussianBlurRef.current.setAttribute('stdDeviation', displace.toString());
        }
    }, [
        width,
        height,
        borderRadius,
        borderWidth,
        brightness,
        opacity,
        blur,
        displace,
        distortionScale,
        redOffset,
        greenOffset,
        blueOffset,
        xChannel,
        yChannel,
        mixBlendMode
    ]);

    useEffect(() => {
        if (!containerRef.current) return;

        const resizeObserver = new ResizeObserver(() => {
            setTimeout(updateDisplacementMap, 0);
        });

        resizeObserver.observe(containerRef.current);

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    useEffect(() => {
        setTimeout(updateDisplacementMap, 0);
    }, [width, height]);

    useEffect(() => {
        setSvgSupported(supportsSVGFilters());
    }, []);

    const supportsSVGFilters = () => {
        if (typeof window === 'undefined' || typeof document === 'undefined') {
            return false;
        }

        const isWebkit = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
        const isFirefox = /Firefox/.test(navigator.userAgent);

        if (isWebkit || isFirefox) {
            return false;
        }

        const div = document.createElement('div');
        div.style.backdropFilter = `url(#${filterId})`;

        return div.style.backdropFilter !== '';
    };

    const containerStyle = {
        ...style,
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        borderRadius: `${borderRadius}px`,
        // @ts-ignore
        '--glass-frost': backgroundOpacity,
        // @ts-ignore
        '--glass-saturation': saturation,
        // @ts-ignore
        '--filter-id': `url(#${filterId})`
    };

    return (
        <div
            ref={containerRef}
            className={`glass-surface ${svgSupported ? 'glass-surface--svg' : 'glass-surface--fallback'} ${className}`}
            style={containerStyle}
        >
            <svg className="glass-surface__filter" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <filter id={filterId} colorInterpolationFilters="sRGB" x="0%" y="0%" width="100%" height="100%">
                        <feImage ref={feImageRef} x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="map" />

                        <feDisplacementMap ref={redChannelRef} in="SourceGraphic" in2="map" id="redchannel" result="dispRed" />
                        <feColorMatrix
                            in="dispRed"
                            type="matrix"
                            values="1 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"
                            result="red"
                        />

                        <feDisplacementMap
                            ref={greenChannelRef}
                            in="SourceGraphic"
                            in2="map"
                            id="greenchannel"
                            result="dispGreen"
                        />
                        <feColorMatrix
                            in="dispGreen"
                            type="matrix"
                            values="0 0 0 0 0
                      0 1 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"
                            result="green"
                        />

                        <feDisplacementMap ref={blueChannelRef} in="SourceGraphic" in2="map" id="bluechannel" result="dispBlue" />
                        <feColorMatrix
                            in="dispBlue"
                            type="matrix"
                            values="0 0 0 0 0
                      0 0 0 0 0
                      0 0 1 0 0
                      0 0 0 1 0"
                            result="blue"
                        />

                        <feBlend in="red" in2="green" mode="screen" result="rg" />
                        <feBlend in="rg" in2="blue" mode="screen" result="output" />
                        <feGaussianBlur ref={gaussianBlurRef} in="output" stdDeviation="0.7" />
                    </filter>
                </defs>
            </svg>

            <div className="glass-surface__content">{children}</div>
        </div>
    );
};
