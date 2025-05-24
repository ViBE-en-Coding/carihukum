'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  FileText,
  Download,
  ExternalLink,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { SearchResult } from '@/types/search';

interface DocumentViewerDialogProps {
  readonly result: SearchResult;
  readonly children: React.ReactNode;
}

export function DocumentViewerDialog({
  result,
  children,
}: DocumentViewerDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [useGoogleViewer, setUseGoogleViewer] = useState(true);

  const selectedFile = result.files?.[selectedFileIndex];
  const fileUrl = selectedFile
    ? `https://peraturan.bpk.go.id${selectedFile.download_url}`
    : null;

  // Use Google Docs viewer to ensure PDFs are displayed inline instead of downloaded
  const googleViewerUrl = fileUrl
    ? `https://docs.google.com/viewer?url=${encodeURIComponent(fileUrl)}&embedded=true`
    : null;

  // Fallback to PDF.js viewer
  const pdfJsViewerUrl = fileUrl
    ? `https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(fileUrl)}`
    : null;

  const currentViewerUrl = useGoogleViewer ? googleViewerUrl : pdfJsViewerUrl;

  const handleIframeLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
  };
  const resetDialog = () => {
    setIsLoading(true);
    setHasError(false);
    setSelectedFileIndex(0);
    setUseGoogleViewer(true); // Reset to Google viewer by default
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      resetDialog();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="flex h-[90vh] max-w-7xl flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-start gap-3">
            <FileText className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
            <div className="min-w-0 flex-1">
              <h3 className="line-clamp-2 text-left">{result.title}</h3>
              <div className="mt-2 flex items-center gap-2">
                <Badge variant="outline">{result.type}</Badge>
                <span className="text-sm text-muted-foreground">
                  No. {result.number}
                </span>
                <span className="text-sm text-muted-foreground">
                  {result.date}
                </span>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>{' '}
        {/* File selection tabs */}
        {result.files && result.files.length > 1 && (
          <div className="flex gap-2 overflow-x-auto border-b pb-2">
            {result.files.map((file, index) => (
              <Button
                key={file.file_id}
                variant={selectedFileIndex === index ? 'default' : 'outline'}
                size="sm"
                onClick={() => {
                  setSelectedFileIndex(index);
                  resetDialog();
                }}
                className="whitespace-nowrap"
              >
                {file.filename}
              </Button>
            ))}
          </div>
        )}
        {/* Viewer selection */}
        {/* <div className="flex items-center justify-between pb-2 border-b">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            Viewer: {useGoogleViewer ? 'Google Docs' : 'PDF.js'}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setUseGoogleViewer(!useGoogleViewer);
              setHasError(false);
              setIsLoading(true);
            }}
            className="text-xs"
          >
            Ganti Viewer
          </Button>
        </div> */}
        {/* File viewer */}
        <div className="relative flex-1">
          {!result.files || result.files.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <AlertCircle className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="text-lg font-medium">Tidak ada file tersedia</h3>
                <p className="text-muted-foreground">
                  Dokumen ini tidak memiliki file yang dapat ditampilkan
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Loading indicator */}
              {isLoading && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/80">
                  <div className="text-center">
                    <Loader2 className="mx-auto mb-2 h-8 w-8 animate-spin" />
                    <p className="text-sm text-muted-foreground">
                      Memuat dokumen...
                    </p>
                  </div>
                </div>
              )}
              {/* Error state */}
              {hasError && !isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-background">
                  <div className="text-center">
                    <AlertCircle className="mx-auto mb-4 h-12 w-12 text-red-500" />
                    <h3 className="text-lg font-medium">
                      Gagal memuat dokumen
                    </h3>
                    <p className="mb-4 text-muted-foreground">
                      Dokumen tidak dapat ditampilkan dalam pratinjau
                    </p>{' '}
                    <div className="flex justify-center gap-2">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setUseGoogleViewer(!useGoogleViewer);
                          setHasError(false);
                          setIsLoading(true);
                        }}
                        className="inline-flex items-center gap-2"
                      >
                        <FileText className="h-4 w-4" />
                        Coba viewer lain
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() =>
                          fileUrl && window.open(fileUrl, '_blank')
                        }
                        className="inline-flex items-center gap-2"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Buka di tab baru
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = fileUrl ?? '';
                          link.download =
                            selectedFile?.filename ?? 'document.pdf';
                          link.click();
                        }}
                        className="inline-flex items-center gap-2"
                      >
                        <Download className="h-4 w-4" />
                        Unduh file
                      </Button>
                    </div>
                  </div>
                </div>
              )}{' '}
              {/* PDF iframe */}
              {currentViewerUrl && (
                <iframe
                  src={currentViewerUrl}
                  className="h-full w-full rounded-lg border-0"
                  title={`${result.title} - ${selectedFile?.filename}`}
                  onLoad={handleIframeLoad}
                  onError={handleIframeError}
                  allow="fullscreen"
                />
              )}
            </>
          )}
        </div>
        {/* Action buttons */}
        {selectedFile && (
          <div className="flex items-center justify-between border-t pt-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <FileText className="h-4 w-4" />
              {selectedFile.filename}
            </div>{' '}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => fileUrl && window.open(fileUrl, '_blank')}
                className="inline-flex items-center gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                Buka di tab baru
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = fileUrl ?? '';
                  link.download = selectedFile.filename;
                  link.click();
                }}
                className="inline-flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Unduh
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
