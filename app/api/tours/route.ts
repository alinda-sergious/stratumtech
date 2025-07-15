import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

console.log('Service role key:', process.env.SUPABASE_SERVICE_ROLE_KEY);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title,
      location,
      price_per_person,
      duration,
      short_description,
      detailed_description,
      main_image,
      gallery_images,
      itinerary,
      included,
      excluded,
      is_active = true,
    } = body;

    // Insert the tour into the database
    const { data, error } = await supabase.from('tours').insert([
      {
        title,
        location,
        price_per_person,
        duration,
        short_description,
        detailed_description,
        main_image,
        gallery_images,
        itinerary,
        included,
        excluded,
        is_active,
      },
    ]);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('Create tour error:', error);
    return NextResponse.json({ error: error.message || String(error) }, { status: 500 });
  }
} 