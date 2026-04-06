# 🌟 المساعد الذكي لمؤسسة رواد التنمية (صندوق مصعب خورما)

هذا المستودع يحتوي على الشفرة المصدرية (Source Code) للمساعد الذكي المخصص لبرنامج "صندوق مصعب خورما" التابع لمؤسسة رواد التنمية. تم بناء هذا النظام ليقوم بالرد التلقائي الذكي على استفسارات الطلاب والرواد حول تفاصيل المنحة، مستعيناً بتقنيات الذكاء الاصطناعي المتقدمة (Gemini 3.1 Pro) وتقنية البحث الدلالي المعزز بإنشاء النصوص (RAG).

## 🚀 المميزات الأساسية
- **محرك ذكاء اصطناعي متطور:** يعتمد على نموذج `gemini-3.1-pro` من جوجل للحصول على تفاعل دقيق ولغة سلسة ومناسبة لدور البوت.
- **معرفة متخصصة (RAG):** مرتبط بقاعدة بيانات اتجاهية (Pinecone) لتزويد البوت بالمعلومات الدقيقة من كتيب الصندوق لعام 2025 حصرياً وبدون هلوسة.
- **تصميم متجاوب وأنيق:** واجهة مصممة خصيصاً لتتطابق تماماً مع الألوان والهوية البصرية لمنصة رواد (السيان السماوي #00AEEF والخلفيات البيضاء الفاخرة).
- **سهل التضمين:** يمكن دمجه في أي موقع ويب بسهولة باستخدام تقنية (Iframe).

---

## 🛠️ متطلبات التشغيل الأساسية
قبل البدء وتنزيل الكود، تأكد من توافر الآتي:
- **Node.js** (نسخة 18 وما فوق)
- مفتاح API فعّال من **Google Gemini**
- مفتاح API وإعداد Index مسبق من منصة **Pinecone**

---

## 💻 خطوات التشغيل المحلي

1. **الحصول على نسخة من المشروع:**
   ```bash
   git clone https://github.com/aabuzaid1/RagChatbot.git
   cd RagChatbot
   ```

2. **تثبيت الحزم البرمجية:**
   ```bash
   npm install
   ```

3. **إعداد المتغيرات البيئية (Environment Variables):**
   قم بإنشاء ملف باسم `.env.local` في المجلد الرئيسي (نفس مسار ملف `package.json`) وأضف فيه مفاتيح التوصيل الخاصة بك:
   ```env
   GOOGLE_GENERATIVE_AI_API_KEY=your-google-api-key-here
   PINECONE_API_KEY=your-pinecone-api-key-here
   PINECONE_INDEX=ragchat
   ```

4. **تشغيل السيرفر للتطوير:**
   ```bash
   npm run dev
   ```
   سيُفتح الموقع محلياً على `http://localhost:3000`.

---

## 🌐 التحديث وتدريب البوت (Data Seeding)
إذا قمت بإضافة ملفات جديدة أو تم تعديل الشروط في كتيب المنحة، ستحتاج إلى إعادة حفظ النصوص داخل قاعدة البيانات (Pinecone):
1. ضع ملف الـ PDF أو الملفات المطلوبة في مجلد `data`.
2. قم بتشغيل سكربت معالجة ورفع البيانات ببساطة:
   ```bash
   npm run seed
   ```

---

## 📦 رفع ونشر المشروع (Deployment)
أفضل واسهل بيئة لنشر وتفعيل تطبيقات Next.js هي بشكل مجاني عبر منصة **[Vercel](https://vercel.com)**:
1. قم بإنشاء حساب في Vercel وتأكد من ربط حساب GitHub الخاص بك.
2. قم بعمل استيراد (Import) لمستودع `RagChatbot`.
3. لا تنسَ، في قسم (Environment Variables) داخل لوحة Vercel، ادخال المفاتيح الخاصة بك من الـ `.env.local`.
4. اضغط على خيار Deploy!

---

## ✨ كيفية تضمين البوت داخل موقع رواد (Integration)

بمجرد اكتمال النشر، Vercel ستعطيك رابط حي للمشروع، لنفترض أنه `https://rag-chatbot-example.vercel.app`.
لتضمين هذا البوت بشكل زر عائم وأنيق على الموقع الخاص بك بالمنظمة، اطلب من المطور إضافة الكود التالي أسفل قسم الـ `</body>` المباشر:

```html
<!-- نافذة البوت (مخبأة مبدئياً) -->
<div id="ruwwad-bot-container" style="position: fixed; bottom: 100px; right: 20px; width: 380px; height: 600px; max-height: 75vh; max-width: 90vw; z-index: 999999; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.15); border: 1px solid #e2e8f0; display: none; opacity: 0; transition: all 0.3s ease;">
  <iframe src="https://[YOUR_VERCEL_DOMAIN]/" style="width: 100%; height: 100%; border: none;"></iframe>
</div>

<!-- الزر العائم لفتح واغلاق البوت -->
<button onclick="toggleBot()" style="position: fixed; bottom: 20px; right: 20px; width: 65px; height: 65px; border-radius: 50%; background-color: #ffffff; border: 1px solid #00AEEF; box-shadow: 0 4px 20px rgba(0, 174, 239, 0.3); z-index: 1000000; cursor: pointer; display: flex; justify-content: center; align-items: center; transition: transform 0.2s;">
  <img src="https://www.ruwwadlearning.space/رابط/لوجو/رواد.png" alt="شات بوت" style="width: 35px; object-fit: contain;" />
</button>

<!-- سكربت التحكم بالظهور والاغلاق بنعومة -->
<script>
  function toggleBot() {
    var container = document.getElementById('ruwwad-bot-container');
    if (container.style.display === 'none' || container.style.display === '') {
      container.style.display = 'block';
      setTimeout(() => { container.style.opacity = '1'; container.style.transform = 'translateY(0)'; }, 10);
    } else {
      container.style.opacity = '0';
      container.style.transform = 'translateY(10px)';
      setTimeout(() => { container.style.display = 'none'; }, 300);
    }
  }
</script>
```

**⚠️ ملاحظات هامة للدمج:**
- يجب استبدال `[YOUR_VERCEL_DOMAIN]` في الجزء أعلاه بالرابط الفعلي اللي تم إنشاؤه في Vercel.
- يجب استبدال مسار صورة الزر `<img>` بصورة اللوجو الرسمية لرواد والمتوفرة في ملفات موقعكم لتكون أيقونة الزر.
