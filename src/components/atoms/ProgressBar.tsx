import React from 'react'
import { Text } from './Text'

interface ProgressBarProps {
    percentage?: number;
    label?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
    percentage = 50,
    label = "50%"
}) => {
   
    return (
        <div className="gap-sm" style={{display: "flex", flexDirection: "row", width: "100%", flex: 1, alignItems: "center"}}>
            <div
                className="border-dark br-sm"
                style={{ height: 12 , display: "flex", width: "100%", flex: 1}}
            >
                <div
                    className="bg-dark br-sm"
                    style={{ height: "100%", width: `${percentage}%` }}
                >
                </div>
            </div>
            {label && <Text className="body-b2">{label}</Text>}
        </div>
    )
}

