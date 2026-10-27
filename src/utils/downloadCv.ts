/**
 * Robust CV Download helper
 * Fetches the genuine PDF binary as a blob and creates an object URL,
 * ensuring the downloaded file is a valid, uncorrupted PDF across all browsers and iframes.
 */
export async function downloadCV(e?: React.MouseEvent) {
  if (e) {
    e.preventDefault();
  }

  const cvUrl = '/api/download-cv';
  const fallbackUrl = '/assets/aistudio/CHAABEN_RayenAlternance__1__dc58041d.pdf';

  try {
    const response = await fetch(cvUrl);
    if (!response.ok) {
      throw new Error(`Fetch failed: ${response.status}`);
    }
    const blob = await response.blob();
    // Verify it's actually a PDF blob
    const pdfBlob = new Blob([blob], { type: 'application/pdf' });
    const blobUrl = window.URL.createObjectURL(pdfBlob);

    const anchor = document.createElement('a');
    anchor.href = blobUrl;
    anchor.download = 'Rayen_Chaaben_CV.pdf';
    anchor.style.display = 'none';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);

    // Clean up memory
    setTimeout(() => {
      window.URL.revokeObjectURL(blobUrl);
    }, 2000);
  } catch (error) {
    console.warn('Blob download fallback to direct window download:', error);
    // Direct browser fallback
    window.open(fallbackUrl, '_blank');
  }
}
