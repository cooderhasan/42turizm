import { pgTable, unique, serial, text, timestamp, integer, boolean, foreignKey } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const users = pgTable("users", {
	id: serial().primaryKey().notNull(),
	email: text().notNull(),
	password: text().notNull(),
	role: text().default('admin'),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
}, (table) => [
	unique("users_email_unique").on(table.email),
]);

export const settings = pgTable("settings", {
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
	id: serial().primaryKey().notNull(),
	siteTitle: text("site_title").default('42 Turizm').notNull(),
	siteDescription: text("site_description").default('42 Turizm - Güvenli ve Konforlu Taşımacılık').notNull(),
	address: text(),
	phone1: text(),
	phone2: text(),
	email: text(),
	instagramUrl: text("instagram_url"),
	facebookUrl: text("facebook_url"),
	linkedinUrl: text("linkedin_url"),
	aboutText: text("about_text"),
	missionText: text("mission_text"),
	visionText: text("vision_text"),
	videoUrl: text("video_url"),
	logoUrl: text("logo_url"),
	whatsappNumber: text("whatsapp_number"),
	videoThumbnailUrl: text("video_thumbnail_url"),
	googleMapsEmbedUrl: text("google_maps_embed_url"),
	aboutImageUrl: text("about_image_url"),
	stat1Label: text("stat1_label"),
	stat1Value: text("stat1_value"),
	stat2Label: text("stat2_label"),
	stat2Value: text("stat2_value"),
	stat3Label: text("stat3_label"),
	stat3Value: text("stat3_value"),
});

export const testimonials = pgTable("testimonials", {
	id: serial().primaryKey().notNull(),
	name: text().notNull(),
	title: text(),
	content: text().notNull(),
	rating: integer().default(5),
	imageUrl: text("image_url"),
	isActive: boolean("is_active").default(true),
	order: integer().default(0),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
});

export const blogPosts = pgTable("blog_posts", {
	id: serial().primaryKey().notNull(),
	title: text().notNull(),
	slug: text().notNull(),
	excerpt: text(),
	content: text(),
	author: text(),
	imageUrl: text("image_url"),
	publishedAt: timestamp("published_at", { mode: 'string' }),
	isPublished: boolean("is_published").default(false),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
}, (table) => [
	unique("blog_posts_slug_unique").on(table.slug),
]);

export const references = pgTable("references", {
	id: serial().primaryKey().notNull(),
	name: text().notNull(),
	imageUrl: text("image_url").notNull(),
	category: text().default('private'),
	order: integer().default(0),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
});

export const services = pgTable("services", {
	id: serial().primaryKey().notNull(),
	title: text().notNull(),
	slug: text().notNull(),
	shortDescription: text("short_description"),
	detailedDescription: text("detailed_description"),
	iconName: text("icon_name"),
	imageUrl: text("image_url"),
	features: text().array(),
	isActive: boolean("is_active").default(true),
	order: integer().default(0),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
	serviceArea: text("service_area"),
}, (table) => [
	unique("services_slug_unique").on(table.slug),
]);

export const vehicles = pgTable("vehicles", {
	id: serial().primaryKey().notNull(),
	name: text().notNull(),
	category: text(),
	capacity: integer(),
	fuelType: text("fuel_type"),
	driverOption: text("driver_option"),
	imageUrl: text("image_url"),
	isActive: boolean("is_active").default(true),
	order: integer().default(0),
});

export const tours = pgTable("tours", {
	id: serial().primaryKey().notNull(),
	title: text().notNull(),
	slug: text().notNull(),
	coverImage: text("cover_image"),
	description: text(),
}, (table) => [
	unique("tours_slug_unique").on(table.slug),
]);

export const tourImages = pgTable("tour_images", {
	id: serial().primaryKey().notNull(),
	tourId: integer("tour_id"),
	imageUrl: text("image_url").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.tourId],
			foreignColumns: [tours.id],
			name: "tour_images_tour_id_tours_id_fk"
		}),
]);

export const heroSlides = pgTable("hero_slides", {
	id: serial().primaryKey().notNull(),
	title: text().notNull(),
	subtitle: text(),
	imageUrl: text("image_url").notNull(),
	buttonText: text("button_text"),
	buttonLink: text("button_link"),
	isActive: boolean("is_active").default(true),
	order: integer().default(0),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
});

export const contactMessages = pgTable("contact_messages", {
	id: serial().primaryKey().notNull(),
	name: text().notNull(),
	email: text().notNull(),
	phone: text(),
	subject: text(),
	message: text().notNull(),
	isRead: boolean("is_read").default(false),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
});
