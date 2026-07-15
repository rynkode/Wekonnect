-- Fix broken city cover images in Supabase (run once in SQL Editor)

update public.cities set cover_image_url = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop' where slug = 'bergen';
update public.cities set cover_image_url = 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=500&fit=crop' where slug = 'london';
update public.cities set cover_image_url = 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&h=500&fit=crop' where slug = 'new-york';
update public.cities set cover_image_url = 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=500&fit=crop' where slug = 'tokyo';
