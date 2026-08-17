import { MetadataRoute } from 'next';
import { ConverterRegistry, FORMATS } from '@convertkit/core';
import { ImageConverter } from '@convertkit/converter-image';
import { PdfTextConverter } from '@convertkit/converter-pdf-text';
import { CsvJsonConverter } from '@convertkit/converter-csv-json';
import { MarkdownHtmlConverter } from '@convertkit/converter-markdown-html';
import { OfficePdfConverter } from '@convertkit/converter-office-pdf';
import { FfmpegConverter } from '@convertkit/converter-ffmpeg';
import { TesseractOCRConverter } from '@convertkit/converter-ocr';

const registry = new ConverterRegistry();
registry.register(new ImageConverter());
registry.register(new PdfTextConverter());
registry.register(new CsvJsonConverter());
registry.register(new MarkdownHtmlConverter());
registry.register(new OfficePdfConverter());
registry.register(new FfmpegConverter());
registry.register(new TesseractOCRConverter());

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://convertkit.cloud'; // Target production domain
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ];

  const formats = Object.values(FORMATS);

  // Generate a URL for every valid conversion path found by the registry
  for (const from of formats) {
    for (const to of formats) {
      if (from.id === to.id) continue;

      const converter = registry.resolveConverter(from, to);
      if (converter) {
        routes.push({
          url: `${baseUrl}/convert/${from.id}-to-${to.id}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.8,
        });
      }
    }
  }

  return routes;
}
