// script.js
document.getElementById('predictButton').addEventListener('click', async () => {
    const fileInput = document.getElementById('imageUpload');
    if (fileInput.files.length === 0) {
        alert('Please select an image first!');
        return;
    }

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('image', file);

    // Display the original image
    document.getElementById('originalImage').src = URL.createObjectURL(file);
    document.getElementById('predictedMask').src = ''; // Clear previous mask

    // --- Make the API call to your backend ---
    // Replace with your actual Hugging Face Space URL
    const backendUrl = 'https://huggingface.co/spaces/lucaslanglois/UAV_Seagrass_AI/predict'; 

    try {
        const response = await fetch(backendUrl, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Prediction failed: ${response.statusText}`);
        }

        const imageBlob = await response.blob();
        const imageUrl = URL.createObjectURL(imageBlob);
        document.getElementById('predictedMask').src = imageUrl;

    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during prediction.');
    }
});