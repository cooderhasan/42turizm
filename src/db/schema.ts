import { pgTable, serial, text, timestamp, boolean, integer, json } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    email: text('email').notNull().unique(),
    password: text('password').notNull(),
    role: text('role').default('admin'),
    createdAt: timestamp('created_at').defaultNow(),
});

export const settings = pgTable('settings', {
    id: serial('id').primaryKey(),
    siteTitle: text('site_title').notNull().default('42 Turizm'),
    siteDescription: text('site_description').notNull().default('42 Turizm - Güvenli ve Konforlu Taşımacılık'),
    address: text('address'),
    phone1: text('phone1'),
    phone2: text('phone2'),
    email: text('email'),
    whatsappNumber: text('whatsapp_number'),
    instagramUrl: text('instagram_url'),
    facebookUrl: text('facebook_url'),
    linkedinUrl: text('linkedin_url'),
    aboutText: text('about_text'),
    missionText: text('mission_text'),
    visionText: text('vision_text'),
    videoUrl: text('video_url'),
    videoThumbnailUrl: text('video_thumbnail_url'), // Added video thumbnail URL
    logoUrl: text('logo_url'), // Added logoUrl
    faviconUrl: text('favicon_url'), // Added faviconUrl
    googleMapsEmbedUrl: text('google_maps_embed_url'), // Added Google Maps embed URL
    aboutImageUrl: text('about_image_url'), // Added About section image URL
    stat1Label: text('stat1_label'), // Added stat labels
    stat1Value: text('stat1_value'),
    stat2Label: text('stat2_label'),
    stat2Value: text('stat2_value'),
    stat3Label: text('stat3_label'),
    stat3Value: text('stat3_value'),
    updatedAt: timestamp('updated_at').defaultNow(),
});

export const heroSlides = pgTable('hero_slides', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    subtitle: text('subtitle'),
    imageUrl: text('image_url').notNull(),
    buttonText: text('button_text'),
    buttonLink: text('button_link'),
    isActive: boolean('is_active').default(true),
    order: integer('order').default(0),
    createdAt: timestamp('created_at').defaultNow(),
});

export const services = pgTable('services', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    slug: text('slug').notNull().unique(),
    shortDescription: text('short_description'),
    detailedDescription: text('detailed_description'),
    iconName: text('icon_name'),
    imageUrl: text('image_url'),
    features: text('features').array(),
    serviceArea: text('service_area'), // Added service area field
    isActive: boolean('is_active').default(true),
    order: integer('order').default(0),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

export const blogPosts = pgTable('blog_posts', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    slug: text('slug').notNull().unique(),
    excerpt: text('excerpt'),
    content: text('content'),
    author: text('author'),
    imageUrl: text('image_url'),
    publishedAt: timestamp('published_at'),
    isPublished: boolean('is_published').default(false),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

export const references = pgTable('references', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    imageUrl: text('image_url').notNull(),
    category: text('category').default('private'), // 'public' or 'private'
    order: integer('order').default(0),
    createdAt: timestamp('created_at').defaultNow(),
});

export const vehicles = pgTable('vehicles', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    category: text('category'), // e.g. 'Minibüs', 'Otobüs', 'VIP'
    capacity: integer('capacity'),
    fuelType: text('fuel_type'),
    driverOption: text('driver_option'), // 'Şoförlü', 'Şoförsüz'
    imageUrl: text('image_url'),
    isActive: boolean('is_active').default(true),
    order: integer('order').default(0),
});

export const tours = pgTable('tours', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    slug: text('slug').notNull().unique(),
    coverImage: text('cover_image'),
    description: text('description'),
});

export const tourImages = pgTable('tour_images', {
    id: serial('id').primaryKey(),
    tourId: integer('tour_id').references(() => tours.id),
    imageUrl: text('image_url').notNull(),
});

export const toursRelations = relations(tours, ({ many }) => ({
    images: many(tourImages),
}));

export const tourImagesRelations = relations(tourImages, ({ one }) => ({
    tour: one(tours, {
        fields: [tourImages.tourId],
        references: [tours.id],
    }),
}));

export const contactMessages = pgTable('contact_messages', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull(),
    phone: text('phone'),
    subject: text('subject'),
    message: text('message').notNull(),
    isRead: boolean('is_read').default(false),
    createdAt: timestamp('created_at').defaultNow(),
});

export const testimonials = pgTable('testimonials', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    title: text('title'),
    content: text('content').notNull(),
    rating: integer('rating').default(5),
    imageUrl: text('image_url'),
    isActive: boolean('is_active').default(true),
    order: integer('order').default(0),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});
