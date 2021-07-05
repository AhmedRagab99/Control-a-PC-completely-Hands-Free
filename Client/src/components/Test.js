import React from 'react'

export default function Test() {
    const uploadedImage = React.useRef(null);
    const imageUploader = React.useRef(null);

    const handleImageUpload = e => {
        const [file] = e.target.files;
        if (file) {
            const reader = new FileReader();
            const { current } = uploadedImage;
            current.file = file;
            reader.onload = e => {
                current.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    };
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                ref={imageUploader}
                style={{
                    display: "none"
                }}
            />
            <button className="h-24 w-24 rounded-full focus:outline-none border-transparent bg-indigo-400 "
                onClick={() => imageUploader.current.click()}>
                <img
                    ref={uploadedImage}
                    style={{
                        width: "100%",
                        height: "100%",
                        position: "acsolute"
                    }}
                    alt='' />
                Click to upload Image    
            </button >
            
        </div >
    );

}
