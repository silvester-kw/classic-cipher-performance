import { useState } from "react";
import { FaCopy } from "react-icons/fa";

interface ShareLinkProps {
  link: string;
}

const ShareLink: React.FC<ShareLinkProps> = ({ link }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setIsCopied(true);
    } catch (error) {
      console.error("Failed to copy link to clipboard", error);
    }
  };

  return (
    <div onClick={handleCopyLink} className="cursor-pointer hover:text-blue-800 flex items-center space-x-2">
      <span>copy to clipboard</span>
      <FaCopy className="cursor-pointer" />
      {isCopied && <span className="text-green-500 ml-2">Copied!</span>}
    </div>
  );
};

export default ShareLink;
