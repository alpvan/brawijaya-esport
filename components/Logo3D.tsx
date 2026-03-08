import React from 'react';
import '@google/model-viewer';

interface Logo3DProps {
    className?: string;
    size?: 'small' | 'medium' | 'large';
    autoRotate?: boolean;
    interactive?: boolean;
}

const Logo3D: React.FC<Logo3DProps> = ({
    className = '',
    size = 'medium',
    autoRotate = true,
    interactive = false
}) => {
    const sizeClasses = {
        small: 'w-16 h-16',
        medium: 'w-32 h-32 md:w-48 md:h-48',
        large: 'w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96'
    };

    return (
        <div className={`${sizeClasses[size]} ${className}`}>
            <model-viewer
                src="./Logo.glb"
                alt="Brawijaya Esport 3D Logo"
                auto-rotate={autoRotate}
                rotation-per-second="30deg"
                camera-controls={interactive}
                disable-zoom={true}
                disable-pan={true}
                shadow-intensity="0"
                exposure="1.2"
                camera-orbit="0deg 75deg 105%"
                min-camera-orbit="auto auto 105%"
                max-camera-orbit="auto auto 105%"
                field-of-view="30deg"
                interaction-prompt="none"
                loading="eager"
                touch-action="pan-y"
                style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'transparent',
                }}
            />
        </div>
    );
};

export default Logo3D;
