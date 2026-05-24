
{
  "entities": {
    "LoveText": {
      "title": "LoveText",
      "description": "A romantic message or vibe.",
      "type": "object",
      "properties": {
        "content": { "type": "object", "description": "Map of language codes to text content" },
        "category": { "type": "string" },
        "likes": { "type": "number" },
        "createdAt": { "type": "string", "format": "date-time" }
      },
      "required": ["content", "category"]
    },
    "Quote": {
      "title": "Quote",
      "description": "An inspirational quote.",
      "type": "object",
      "properties": {
        "text": { "type": "object" },
        "author": { "type": "string" },
        "category": { "type": "string" },
        "imageUrl": { "type": "string" },
        "createdAt": { "type": "string", "format": "date-time" }
      },
      "required": ["text", "author", "category"]
    },
    "Story": {
      "title": "Story",
      "description": "A romantic story.",
      "type": "object",
      "properties": {
        "title": { "type": "object" },
        "author": { "type": "string" },
        "excerpt": { "type": "object" },
        "content": { "type": "object" },
        "category": { "type": "string" },
        "readingTime": { "type": "string" },
        "createdAt": { "type": "string", "format": "date-time" }
      },
      "required": ["title", "author", "content", "category"]
    }
  },
  "auth": {
    "providers": ["google.com"]
  },
  "firestore": {
    "/loveTexts/{textId}": { "schema": "LoveText", "description": "Collection of love messages" },
    "/quotes/{quoteId}": { "schema": "Quote", "description": "Collection of quotes" },
    "/stories/{storyId}": { "schema": "Story", "description": "Collection of stories" }
  }
}
