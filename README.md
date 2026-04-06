<p align="center">
  <img src="logo ruwwad.png" alt="شعار مؤسسة رواد التنمية" width="180" />
</p>

<h1 align="center">المساعد الذكي — صندوق مصعب خورما</h1>

<p align="center">
  <strong>مؤسسة رواد التنمية &bull; برنامج تنظيم وبناء قيادة الشباب</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/Gemini_2.5-Flash-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Gemini" />
  <img src="https://img.shields.io/badge/Pinecone-Vector_DB-00C896?style=for-the-badge" alt="Pinecone" />
  <img src="https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/TailwindCSS-4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="TailwindCSS" />
</p>

<p align="center">
  مساعد ذكي يعتمد على تقنية <strong>RAG</strong> (Retrieval-Augmented Generation) للإجابة التلقائية على استفسارات الطلاب والرواد حول تفاصيل منحة صندوق مصعب خورما، مستعيناً بنموذج <strong>Gemini 2.5 Flash</strong> وقاعدة بيانات اتجاهية <strong>Pinecone</strong>.
</p>

---

## ✨ المميزات

| الميزة | الوصف |
|--------|-------|
| 🤖 **محرك ذكاء اصطناعي** | يعتمد على نموذج `gemini-2.5-flash` من Google للحصول على تفاعل دقيق ولغة عربية سلسة |
| 📚 **معرفة متخصصة (RAG)** | مرتبط بقاعدة بيانات Pinecone لتزويد البوت بمعلومات دقيقة من كتيب المنحة 2025 بدون هلوسة |
| 🎨 **تصميم متجاوب** | واجهة أنيقة تتوافق مع الهوية البصرية لرواد (السيان `#00AEEF` والتصميم المضيء) |
| ⚡ **بث مباشر (Streaming)** | الردود تظهر بشكل متدفق في الوقت الحقيقي للحصول على تجربة سلسة |
| 🔗 **سهل التضمين** | يمكن دمجه في أي موقع بسهولة باستخدام `iframe` |

---

## 📁 هيكل المشروع

```
rag-chatbot/
├── 📂 src/
│   ├── 📂 app/
│   │   ├── 📂 api/chat/
│   │   │   └── route.ts          # نقطة نهاية API - معالجة المحادثة مع RAG
│   │   ├── globals.css           # التصميم العام وألوان الهوية البصرية
│   │   ├── layout.tsx            # إعدادات التطبيق والخطوط و SEO
│   │   └── page.tsx              # الصفحة الرئيسية - تجميع المكونات
│   ├── 📂 components/
│   │   ├── ChatHeader.tsx        # شريط العنوان العلوي
│   │   ├── ChatInput.tsx         # حقل إدخال الرسائل وزر الإرسال
│   │   ├── LoadingIndicator.tsx  # مؤشر التحميل (النقاط المتحركة)
│   │   ├── MessageBubble.tsx     # فقاعة الرسالة الواحدة
│   │   ├── WelcomeScreen.tsx     # شاشة الترحيب والاقتراحات
│   │   └── index.ts              # تصدير جميع المكونات
│   └── 📂 lib/
│       └── pinecone.ts           # إعداد عميل Pinecone
├── 📂 scripts/
│   ├── seed.ts                   # سكربت تغذية قاعدة البيانات من PDF
│   └── check-models.ts          # فحص نماذج التضمين المتاحة
├── 📂 data/                       # ملفات البيانات والملخصات
├── 📂 public/
│   └── logo.png                  # شعار رواد التنمية
├── .env.local                    # المتغيرات البيئية (لا يُرفع على Git)
├── package.json
├── tsconfig.json
├── next.config.ts
└── postcss.config.mjs
```

---

## 🛠️ متطلبات التشغيل

| المتطلب | الحد الأدنى |
|---------|-------------|
| **Node.js** | `v18.0+` |
| **مفتاح Google Gemini API** | فعّال مع صلاحية `gemini-2.5-flash` و `gemini-embedding-001` |
| **حساب Pinecone** | مع Index مُعَد مسبقاً |

---

## 🚀 التشغيل المحلي

### 1. استنساخ المشروع

```bash
git clone https://github.com/aabuzaid1/RagChatbot.git
cd RagChatbot
```

### 2. تثبيت الحزم

```bash
npm install
```

### 3. إعداد المتغيرات البيئية

أنشئ ملف `.env.local` في المجلد الرئيسي:

```env
GOOGLE_GENERATIVE_AI_API_KEY=your-google-api-key-here
PINECONE_API_KEY=your-pinecone-api-key-here
PINECONE_INDEX=ragchat
```

### 4. تشغيل السيرفر

```bash
npm run dev
```

> سيُفتح الموقع محلياً على **http://localhost:3000**

---

## 🌐 تدريب البوت (Data Seeding)

عند تحديث أو إضافة معلومات جديدة لكتيب المنحة:

1. ضع ملف PDF في المجلد الرئيسي
2. شغّل سكربت التغذية:

```bash
npm run seed
```

> السكربت يقوم بـ: قراءة PDF ← تقسيم النص ← إنشاء embeddings ← رفع إلى Pinecone

---

## 📦 النشر (Deployment)

أسهل طريقة للنشر عبر **[Vercel](https://vercel.com)**:

1. أنشئ حساب في Vercel واربط حساب GitHub
2. استورد مستودع `RagChatbot`
3. أضف المتغيرات البيئية في لوحة Vercel (نفس محتوى `.env.local`)
4. اضغط **Deploy** 🚀

---

## 🔌 تضمين البوت في موقعك

بعد النشر على Vercel، أضف الكود التالي قبل `</body>` في موقعك:

```html
<!-- نافذة البوت (مخبأة مبدئياً) -->
<div id="ruwwad-bot-container" style="
  position: fixed; bottom: 100px; right: 20px;
  width: 380px; height: 600px;
  max-height: 75vh; max-width: 90vw;
  z-index: 999999; border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0,0,0,0.15);
  border: 1px solid #e2e8f0;
  display: none; opacity: 0;
  transition: all 0.3s ease;">
  <iframe src="https://YOUR_DOMAIN.vercel.app/"
    style="width: 100%; height: 100%; border: none;">
  </iframe>
</div>

<!-- الزر العائم -->
<button onclick="toggleBot()" style="
  position: fixed; bottom: 20px; right: 20px;
  width: 65px; height: 65px; border-radius: 50%;
  background: #ffffff; border: 1px solid #00AEEF;
  box-shadow: 0 4px 20px rgba(0,174,239,0.3);
  z-index: 1000000; cursor: pointer;
  display: flex; justify-content: center; align-items: center;
  transition: transform 0.2s;">
  <img src="/path/to/ruwwad-logo.png" alt="شات بوت"
    style="width: 35px; object-fit: contain;" />
</button>

<!-- سكربت التحكم -->
<script>
  function toggleBot() {
    var c = document.getElementById('ruwwad-bot-container');
    if (c.style.display === 'none' || c.style.display === '') {
      c.style.display = 'block';
      setTimeout(function() {
        c.style.opacity = '1';
        c.style.transform = 'translateY(0)';
      }, 10);
    } else {
      c.style.opacity = '0';
      c.style.transform = 'translateY(10px)';
      setTimeout(function() { c.style.display = 'none'; }, 300);
    }
  }
</script>
```

> ⚠️ **استبدل** `YOUR_DOMAIN` بالدومين الفعلي من Vercel، و `/path/to/ruwwad-logo.png` بمسار اللوجو على موقعكم.

---

## 🧪 سكربتات مفيدة

| الأمر | الوصف |
|-------|-------|
| `npm run dev` | تشغيل سيرفر التطوير |
| `npm run build` | بناء نسخة الإنتاج |
| `npm run start` | تشغيل نسخة الإنتاج |
| `npm run seed` | تغذية قاعدة البيانات |
| `npm run lint` | فحص جودة الكود |

---

## 🏗️ التقنيات المستخدمة

<table>
  <tr>
    <td align="center"><strong>Frontend</strong></td>
    <td>Next.js 15 &bull; React 19 &bull; TailwindCSS 4</td>
  </tr>
  <tr>
    <td align="center"><strong>AI / LLM</strong></td>
    <td>Google Gemini 2.5 Flash &bull; Vercel AI SDK</td>
  </tr>
  <tr>
    <td align="center"><strong>Vector DB</strong></td>
    <td>Pinecone</td>
  </tr>
  <tr>
    <td align="center"><strong>Embeddings</strong></td>
    <td>Gemini Embedding 001</td>
  </tr>
  <tr>
    <td align="center"><strong>Language</strong></td>
    <td>TypeScript 5.7</td>
  </tr>
</table>

---

<p align="center">
  <img src="logo ruwwad.png" alt="رواد التنمية" width="80" />
  <br />
  <sub>صُنع بواسطة فريق التقنية &bull; مؤسسة رواد التنمية &copy; 2025</sub>
</p>
