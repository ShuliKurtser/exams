import { useDownloadURL } from "react-firebase-hooks/storage";
import { storage } from "./firebase"; // Ensure this is your Firebase configuration file
import { ref } from "firebase/storage"; // Import the ref function from Firebase Storage

const PdfLinkView = ({ pdfRef, index }) => {
    // Create a reference using the ref function and the storage object
    const storageRef = ref(storage, pdfRef);
    const [url, loading, error] = useDownloadURL(storageRef);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error...</p>;

    return (
        <div key={index}>
            <a href={url} target="_blank" rel="noopener noreferrer">
                הצג קובץ
            </a>
        </div>
    );
};

export default PdfLinkView;
