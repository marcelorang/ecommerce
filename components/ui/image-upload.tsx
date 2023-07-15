"use client";

import { CldUploadWidget } from "next-cloudinary";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import  Image from "next/image"
import { ImagePlus, Trash } from "lucide-react";


interface ImageUploadProps {
    disabled?: boolean;
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
    value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    disabled,
    onChange,
    onRemove,
    value
}) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const onUpload = (result: any) => {
        onChange(result.info.secure_url);
    }

    if(!isMounted) {
        return null;
    }

    //TODO: RESOLVER o FLEX DO CONTAINER DA IMAGEM 4h:02 tempo no video style usado de improviso
    return (
        <div>
        
         <div className="mb-4  items-center gap-4"  style={{width: 200}}>
            {value.map((url) => (

             <div key={url} className="relative w[200px] h-[200px] rounded-md overflow-hidden">
                <div className="z-10 absolute top-2 right-2">
                  <Button type="button" onClick={() => onRemove(url)} variant="destructive" size="icon">
                      <Trash className="h-4 w-4"/>  
                   </Button>
                </div>
                <Image
                  fill
                  className="object-cover"
                  alt="Image"
                  src={url}  
              
                />
             </div>   
            ))}
         </div>
         
         <CldUploadWidget onUpload={onUpload} uploadPreset="b7mrvjfb">
            {({ open }) => {
                const onClick = () => {
                    open()
                }
                return (
                    <Button
                     type="button"
                     disabled={disabled}
                     variant="secondary"
                     onClick={onClick}   
                    >
                        <ImagePlus className="h-4 w-4 mr-2"/>
                        Upload an Image
                    </Button>
                )
            }}
         </CldUploadWidget>
        </div>
    )
};

export default ImageUpload;
