import { relations } from "drizzle-orm/relations";
import { tours, tourImages } from "./schema";

export const tourImagesRelations = relations(tourImages, ({one}) => ({
	tour: one(tours, {
		fields: [tourImages.tourId],
		references: [tours.id]
	}),
}));

export const toursRelations = relations(tours, ({many}) => ({
	tourImages: many(tourImages),
}));