import { useState, useRef } from 'react';
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
// 引入 isomorphic-fetch
import fetch from 'isomorphic-fetch';

export default function Home() {
  const [imageSrc, setImageSrc] = useState('/placeholder.svg');
  const fileInputRef = useRef();
  const [file, setFile] = useState(null);
  const [catThoughts, setCatThoughts] = useState('');

  const handleImageChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile && uploadedFile.type.startsWith('image/')) {
      setFile(uploadedFile);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target.result);
      };
      reader.readAsDataURL(uploadedFile);
    }
  };

  const handleUploadClick = async () => {
    if (!file) {
      alert('Please select an image of a cat to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    // 打印 FormData 的键值对
    for (let [key, file] of formData.entries()) {
      console.log(`${key}:`, file);
      console.log(`File name: ${file.name}`);
      console.log(`File type: ${file.type}`);
      console.log(`File size: ${file.size} bytes`);
    }

    try {
      // const fetch = require('node-fetch');
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      console.log(response);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        if (data.isCat) {
          setCatThoughts(data.thoughts);
        } else {
          alert('The uploaded image is not a cat image.');
        }
      } else {
        alert('Failed to upload the image.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('An error occurred while uploading the image.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* ... other code ... */}
      <h1 className="text-4xl font-bold text-center mb-4">What is the cat thinking</h1>
      <div className="w-full max-w-md">
        <div className="flex flex-col space-y-4">
          <div className="space-y-2 items-center">
          <Label htmlFor="picture" className="your-custom-class"></Label>
          {/* <Button variant="outline">
            <UploadIcon className="mr-2 h-4 w-4" />
            Upload Image
          </Button> */}
          <input id="picture" type="file" className="your-custom-class" onChange={handleImageChange} />
          <Button
            type="button"
            onClick={handleUploadClick}
            className="rainbow-black-bg hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </Button>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <img
          alt="Uploaded Picture"
          className="aspect-video object-cover rounded-md"
          height={400}
          src={imageSrc}
          width={600}
        />
         {catThoughts && <p>{catThoughts}</p>}
        {/* ... other code ... */}
      </div>
    </div>
  );
}

// function UploadIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
//       <polyline points="17 8 12 3 7 8" />
//       <line x1="12" x2="12" y1="3" y2="15" />
//     </svg>
//   )
// }