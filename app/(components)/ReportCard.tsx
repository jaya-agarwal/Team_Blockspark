// app/(components)/ReportCard.tsx
import { SignedReport } from '@/lib/types';
import { verifySignature } from '@/lib/crypto';

interface ReportCardProps {
  r: SignedReport;
  onchainAuthor?: `0x${string}`;
  isSignatureVerified?: boolean;
}

export default function ReportCard({ r, onchainAuthor, isSignatureVerified }: ReportCardProps) {
  // Use the prop if provided, otherwise calculate locally
  const signatureOk = isSignatureVerified !== undefined 
    ? isSignatureVerified 
    : verifySignature(r.message, r.signature, r.author);
  
  const onChainOk = onchainAuthor && onchainAuthor.toLowerCase() === r.author.toLowerCase();
  
  return (
    <article className="border rounded-lg p-4 bg-white shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold">{r.data.title}</h3>
          <p className="text-gray-600 mt-1">{r.data.description}</p>
        <div className="mt-2 text-sm text-gray-500">
          Location: {r.data.location.lat.toFixed(4)}, {r.data.location.lng.toFixed(4)}
        </div>

          <div className="mt-2 text-sm text-gray-500">
        Category: {r.data.category}
      </div>
      <div className="mt-2 text-xs text-gray-400">
        Reported at: {new Date(r.data.timestamp).toLocaleString()}
      </div>
        </div>
        
        <div className="flex gap-2">
          {signatureOk && (
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
              ✓ Signed
            </span>
          )}
          {onChainOk && (
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              ✓ On-Chain
            </span>
          )}
        </div>
      </div>
      
      <p className="mt-2 text-gray-700">{r.data.description}</p>
      
      {r.data.imageUrl && (
        <div className="mt-3">
          <img 
            src={r.data.imageUrl} 
            alt={r.data.title}
            className="max-w-full h-auto rounded max-h-60 object-cover"
          />
        </div>
      )}
      
      <div className="mt-3 text-sm text-gray-500">
        Location: {r.data.location.lat.toFixed(4)}, {r.data.location.lng.toFixed(4)}
      </div>
    </article>
  );
}