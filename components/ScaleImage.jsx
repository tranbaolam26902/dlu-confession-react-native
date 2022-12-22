import { useState } from 'react';
import { Image } from 'react-native';

function ScaleImage({ source, style }) {
    // Component's states
    const [aspect, setAspect] = useState(1);

    // Event handlers
    const handleLoadImage = () => {
        Image.getSize(source, (width, height) => {
            setAspect(width / height);
        });
    };

    return <Image source={{ uri: source }} style={[{ aspectRatio: aspect }, style]} onLoad={handleLoadImage} />;
}

export default ScaleImage;
