import React, { useState, useEffect } from 'react';
import { Text } from './Text'
import { colors } from '../tokens/colors'

interface ProgressBarProps {
    icon?: string;
    percentage?: number;
    label?: string;
    showBg?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
    icon,
    percentage = 50,
    label = "",
    showBg = false,
}) => {
    const size = 160
    const strokeWidth = 16
    const center = size / 2;
    const radius = center - strokeWidth;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = (circumference - (percentage / 100) * circumference) + strokeWidth;

    const [animatedOffset, setAnimatedOffset] = useState(circumference);

    useEffect(() => {
    // 2. Trigger the transition after the component mounts
    // This lets the browser register the start state before moving to the end state
    const timer = setTimeout(() => {
        setAnimatedOffset(strokeDashoffset);
    }, 50); // A tiny delay ensures the browser registers the initial 0% state

    return () => clearTimeout(timer);
    }, [strokeDashoffset, circumference]); // Re-runs if the target progress changes

   
    return (
        <div className="col align-center" style={{textAlign: "center"}}>
            <div style={{ position: 'relative', width: size, height: size, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
                    {/* Track background circle */}
                    <circle
                        cx={center}
                        cy={center}
                        r={radius + 8.25}
                        stroke={colors.dark}
                        strokeWidth={1}
                        fill="none"
                    />
                    <circle
                        cx={center}
                        cy={center}
                        r={radius - 8.25}
                        stroke={colors.dark}
                        strokeWidth={1}
                        fill="none"
                    />
                    {/* Progress indicator circle */}
                    <circle
                        cx={center}
                        cy={center}
                        r={radius}
                        stroke={colors['aqua']}
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        // 3. Use the animated state variable here instead of the raw calculation
                        strokeDashoffset={animatedOffset}
                        strokeLinecap="round"
                        fill="transparent"
                        // 4. Boost the duration slightly for a smoother "filling" effect on load
                        style={{ transition: 'stroke-dashoffset 1s ease-out' }}
                    />
                </svg>
                
                {/* Center Content: Icon & Label */}
                <div style={{
                    position: 'absolute',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                }}>
                    {showBg && <div className="pad-sm br-2xl flex align-center justify-center" style={{height: "72px", width: "72px", background: showBg ? colors.light : undefined}}>
                        <img src={icon} style={{ height: '56px' }}/>
                    </div>}
                    { !showBg && <img src={icon} style={{ height: '64px' }}/>}
                </div>
            </div>
            {label && <Text className="bodyMedium-b1">{label}</Text>}
        </div>
    )
}

