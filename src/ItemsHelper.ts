import * as fs from 'fs';
import * as path from 'path';
import { ItemWithImage, ParticipantDto } from './types';

// Define the directory path where item images are stored
const imagesDir = path.resolve(
  __dirname,
  '../assets/dragontail-15.1.1/dragontail-15.1.1/15.1.1/img/item'
);

// Map to store item images by their ID
const itemImagesMap: { [key: number]: string } = {};

// Read all files in the images directory and map item IDs to image paths
fs.readdirSync(imagesDir).forEach((file) => {
  const itemID = parseInt(file.match(/\d+/)?.[0] || '', 10);
  itemImagesMap[itemID] = path.join(imagesDir, file);
});

export class ItemsHelper {
  private static helper = new ItemsHelper();
  constructor() {}

  /**
   * Retrieves the items of a participant by their item IDs.
   * @param participant The participant object containing item IDs.
   * @returns An array of item IDs associated with the participant.
   */
  public static getParticipantItems(participant: ParticipantDto): number[] {
    return [
      participant.item0,
      participant.item1,
      participant.item2,
      participant.item3,
      participant.item4,
      participant.item5,
      participant.item6,
    ];
  }

  /**
   * Gets the image for a given item ID.
   * Reads the image file from the system, converts it to base64, and returns the base64 string.
   * If the image is not found, it returns undefined.
   * @param itemID The ID of the item.
   * @returns A base64 string of the image or undefined if the image is not found.
   */
  getImageFromItemID(itemID: number): string | undefined {
    const imagePath = itemImagesMap[itemID];
    if (imagePath) {
      // Read and convert to base64
      const imageBuffer = fs.readFileSync(imagePath);
      return imageBuffer.toString('base64');
    }
    return undefined;
  }

  /**
   * Gets images for multiple items.
   * Takes an array of item IDs and returns an array of objects containing the base64 image string and the item ID.
   * @param itemIDs An array of item IDs.
   * @returns An array of objects with item ID and base64-encoded image.
   */
  public static getImagesFromItems(itemIDs: number[]) {
    const itemImages: ItemWithImage[] = [];
    itemIDs.forEach((item) => {
      const base64Image = this.helper.getImageFromItemID(item);
      if (base64Image) {
        itemImages.push({ image: base64Image, itemID: item });
      }
    });
    return itemImages;
  }
}
