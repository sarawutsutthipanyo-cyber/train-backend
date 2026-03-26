const Anthropic = require('@anthropic-ai/sdk');
const fetch = require('node-fetch');

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

exports.analyzeFood = async (req, res) => {
  try {
    const { imageUrl, imageBase64, mediaType } = req.body;

    let imageSource;

    if (imageBase64) {
      imageSource = {
        type: 'base64',
        media_type: mediaType || 'image/jpeg',
        data: imageBase64,
      };
    } else if (imageUrl) {
      const response = await fetch(imageUrl);
      const buffer = await response.buffer();
      const contentType = response.headers.get('content-type') || 'image/jpeg';
      imageSource = {
        type: 'base64',
        media_type: contentType,
        data: buffer.toString('base64'),
      };
    } else {
      return res.status(400).json({ message: 'ต้องส่ง imageUrl หรือ imageBase64' });
    }

    const message = await client.messages.create({
      model: 'claude-opus-4-6',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: [
            { type: 'image', source: imageSource },
            {
              type: 'text',
              text: `วิเคราะห์อาหารในรูปภาพนี้และประเมินคุณค่าทางโภชนาการ ตอบเป็น JSON เท่านั้น ในรูปแบบนี้:
{
  "foodName": "ชื่ออาหาร (ภาษาไทย)",
  "foodNameEn": "Food name in English",
  "servingSize": "ปริมาณที่เห็นในรูป เช่น 1 จาน / 1 ชาม",
  "estimatedWeight": 300,
  "calories": 450,
  "protein": 25,
  "carbs": 45,
  "fat": 15,
  "fiber": 3,
  "confidence": "high/medium/low",
  "note": "หมายเหตุเพิ่มเติม เช่น ค่าที่ประเมินอาจคลาดเคลื่อนเนื่องจาก..."
}
ตอบเฉพาะ JSON เท่านั้น ไม่ต้องมีข้อความอื่น`,
            },
          ],
        },
      ],
    });

    const text = message.content[0].text.trim();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return res.status(500).json({ message: 'วิเคราะห์ไม่ได้ กรุณาลองใหม่' });

    const result = JSON.parse(jsonMatch[0]);
    res.json(result);
  } catch (err) {
    console.error('Food analysis error:', err.message);
    res.status(500).json({ message: 'วิเคราะห์ไม่สำเร็จ: ' + err.message });
  }
};
