
-- Create storage bucket for business assets (logos, images, etc.)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'business-assets',
  'business-assets',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
);

-- Create storage policies for business assets
CREATE POLICY "Anyone can view business assets" ON storage.objects
FOR SELECT USING (bucket_id = 'business-assets');

CREATE POLICY "Authenticated users can upload business assets" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'business-assets' 
  AND auth.role() = 'authenticated'
  AND (storage.foldername(name))[1] = 'business-logos'
);

CREATE POLICY "Users can update their own business assets" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'business-assets' 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Users can delete their own business assets" ON storage.objects
FOR DELETE USING (
  bucket_id = 'business-assets' 
  AND auth.role() = 'authenticated'
);
