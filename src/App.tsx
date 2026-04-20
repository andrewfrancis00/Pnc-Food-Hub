/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, Utensils, Presentation } from 'lucide-react';

// --- Reusable UI Components for Slides ---
const Card = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-slate-900/60 backdrop-blur-md border border-slate-700/50 p-6 md:p-8 rounded-2xl hover:bg-slate-800/60 transition-colors shadow-xl ${className}`}>
    {children}
  </div>
);

const Quote = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-6 md:mt-8 p-6 md:p-8 rounded-2xl bg-gradient-to-l from-pnc-orange/10 to-transparent border-r-4 border-pnc-orange text-xl md:text-2xl font-bold leading-relaxed text-white shadow-lg">
    {children}
  </div>
);

const FooterNote = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-8 pt-6 border-t border-slate-800 text-sm text-slate-400 leading-relaxed max-w-4xl">
    {children}
  </div>
);

const MetricBox = ({ value, title, desc, color = "text-pnc-yellow" }: any) => (
  <Card className="flex flex-col">
    <div className={`text-4xl md:text-5xl font-extrabold mb-3 ${color} drop-shadow-md`}>{value}</div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-slate-300 leading-relaxed text-sm">{desc}</p>
  </Card>
);

const StepFlow = ({ steps }: { steps: {k:string, t:string, x:string}[] }) => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
    {steps.map((step, idx) => (
      <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-6 relative">
        <div className="text-pnc-yellow text-sm font-bold mb-3">{step.k}</div>
        <h4 className="text-lg font-bold text-white mb-2">{step.t}</h4>
        <p className="text-slate-300 text-sm leading-relaxed">{step.x}</p>
        {idx < steps.length - 1 && (
          <div className="hidden md:block absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 text-slate-600">
            <ChevronLeft className="w-6 h-6" />
          </div>
        )}
      </div>
    ))}
  </div>
);

// --- Slide Content Data ---
const slidesData = [
  {
    id: 1,
    eyebrow: "المميزات الأساسية والفكرة الكبيرة",
    title: "مش عايزين نعمل App وصفات وخلاص…<br/>عايزين نعمل <span class='text-pnc-yellow drop-shadow-[0_0_15px_rgba(254,191,3,0.5)]'>بيت رقمي يومي ومجتمع متكامل</span>",
    lead: "الفكرة إننا نحول قوة قناة PNC Food من مجرد مشاهدة على المنصات إلى منصة حية ومباشرة بتقدم خدمات وfeatures فريدة ومبتكرة تناسب استخدامات ست البيت اليومية.",
    image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=2070&auto=format&fit=crop",
    content: () => (
      <>
        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <Card className="!p-5 border-t-2 border-t-pnc-cyan">
            <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <div className="w-7 h-7 flex-shrink-0 rounded-full bg-pnc-cyan/20 flex items-center justify-center text-pnc-cyan text-sm">1</div> 
              أحدث AI Agent للشيفات
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">كل شيف الناس هتعرف توصله وتتكلم معاه، وهيرد عليهم زيه بالظبط وبنفس أسلوبه ووصفاته المعتمدة، من خلال أحدث تقنيات الـ AI agent في السوق.</p>
          </Card>
          <Card className="!p-5 border-t-2 border-t-pnc-yellow">
            <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <div className="w-7 h-7 flex-shrink-0 rounded-full bg-pnc-yellow/20 flex items-center justify-center text-pnc-yellow text-sm">2</div> 
              متجر رقمي شامل
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">متجر رقمي متكامل يجمع كل منتجاتنا. عشان يكون البيع مباشر والمستخدم يوصل لكل الإضافات والمستلزمات في مكان واحد.</p>
          </Card>
          <Card className="!p-5 border-t-2 border-t-pnc-orange">
            <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <div className="w-7 h-7 flex-shrink-0 rounded-full bg-pnc-orange/20 flex items-center justify-center text-pnc-orange text-sm">3</div> 
              إشعارات مسابقات وحلقات
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">نظام إشعارات (Push Notifications) يوصل لكل المستخدمين بأحدث المسابقات المحفزة، أوقات الحلقات، وأهم الأخبار بشكل فوري.</p>
          </Card>
          <Card className="!p-5 border-t-2 border-t-pnc-teal">
            <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <div className="w-7 h-7 flex-shrink-0 rounded-full bg-pnc-teal/20 flex items-center justify-center text-pnc-teal text-sm">4</div> 
              مرجع لكل ست بيت
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">المنصة مش أكل بس! معاها وصفات شرب، ونصايح دينية وحياتية للمنزل، وجروبات مجتمعية للستات يسألوا و يتكلموا فيها مع بعض.</p>
          </Card>
        </div>

        {/* Board Message / Existing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Card>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4">الرسالة الأساسية للـ Board</h3>
            <p className="text-slate-300 text-base md:text-lg mb-6 leading-relaxed">
              المشروع ده مش “تكلفة إضافية” بقدر ما هو <b className="text-pnc-cyan">أصل استراتيجي</b> يخلي القناة تملك جزء أكبر من الجمهور، وترجع تستخدم مكتبة المحتوى بشكل أذكى، وتفتح باب رعايات وتجارب تجارية جديدة.
            </p>
            <div className="flex gap-2 flex-wrap">
              {['Owned Audience', 'Retention أعلى', 'بيانات مباشرة', 'فرص رعاية جديدة'].map((b, i) => (
                <span key={i} className="bg-white/10 border border-white/10 px-3 py-1.5 rounded-full text-xs md:text-sm font-medium text-white">{b}</span>
              ))}
            </div>
          </Card>
          <div className="flex flex-col gap-4">
            <Card className="flex-1 !p-5 border-l-4 border-l-slate-500">
              <div className="text-2xl font-bold text-white mb-2">من قناة</div>
              <p className="text-slate-400 text-sm md:text-base">بتوصل للناس وقت الحلقة أو وقت الفيديو</p>
            </Card>
            <Card className="flex-1 !p-5 border-l-4 border-l-pnc-teal bg-pnc-teal/10">
              <div className="text-2xl font-bold text-pnc-cyan mb-2">إلى منصة</div>
              <p className="text-slate-200 text-sm md:text-base">الجمهور يفتحها طول الأسبوع، بيلاقي مجتمع، بيتسوق، ويتفاعل</p>
            </Card>
          </div>
        </div>
        <Quote>لو نجحنا في الخطوة دي، PNC Food هتبقى <span className="text-pnc-yellow">أقرب للجمهور من أي وقت</span>، ومش هتبقى معتمدة بالكامل على خوارزميات المنصات الخارجية.</Quote>
      </>
    )
  },
  {
    id: 2,
    eyebrow: "ليه دلوقتي",
    title: "التوقيت مناسب جدًا… لأن كل عناصر النجاح موجودة أصلًا",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2070&auto=format&fit=crop",
    content: () => (
      <>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card>
            <h3 className="text-xl font-bold text-white mb-4 text-pnc-teal">1) الجمهور موجود</h3>
            <p className="text-slate-300 leading-relaxed">إحنا مش بنبدأ من الصفر. عندنا جمهور فعلي، وشيفات معروفين، ومحتوى اتبنى عليه trust بقاله سنين.</p>
          </Card>
          <Card>
            <h3 className="text-xl font-bold text-white mb-4 text-pnc-cyan">2) المحتوى موجود</h3>
            <p className="text-slate-300 leading-relaxed">أصل ضخم من الحلقات والوصفات والفقرات ينفع يتعاد تنظيمه ويعيش عمر أطول جوه المنصة بدل ما يفضل متبعثر.</p>
          </Card>
          <Card>
            <h3 className="text-xl font-bold text-white mb-4 text-pnc-orange">3) سلوك الجمهور مناسب</h3>
            <p className="text-slate-300 leading-relaxed">الجمهور دلوقتي بيدور على السرعة، الحفظ، الرجوع، التذكير، والتفاعل. ده يخلي الويب آب مش رفاهية، بل امتداد طبيعي.</p>
          </Card>
        </div>
        <StepFlow steps={[
          {k: 'النهارده', t: 'مشاهدة متفرقة', x: 'يوتيوب، فيسبوك، وتفاعل متوزع'},
          {k: 'الفرصة', t: 'تجميع منظم', x: 'وصفات، شيفات، برامج، وحلقات في مكان واحد'},
          {k: 'القيمة', t: 'رجوع متكرر', x: 'Saved recipes, notifications, trending, community'},
          {k: 'النتيجة', t: 'علاقة مباشرة', x: 'ولاء أعلى وفرص إيراد أحسن'},
        ]} />
      </>
    )
  },
  {
    id: 3,
    eyebrow: "حجم الفرصة الحالية",
    title: "PNC Food داخلة المشروع وهي واقفة على أرض ثابتة",
    image: "https://images.unsplash.com/photo-1525610553991-2bede1a236e2?q=80&w=2070&auto=format&fit=crop",
    content: () => (
      <>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
          <MetricBox value="3.26M" title="مشترك على YouTube" desc="دي قاعدة بداية قوية جدًا لتحويل جزء من الجمهور إلى مستخدمين على المنصة الجديدة." />
          <MetricBox value="38K+" title="فيديو منشور" desc="مكتبة محتوى ضخمة ينفع تتحول لوصفات، best moments، collections جوه التطبيق." />
          <MetricBox value="600K+" title="إشارة Facebook" desc="الوجود القوي على المنصات الاجتماعية يزود فرص الدفع للتنزيل والمتابعة." />
          <MetricBox value="قوة اسم" title="Brand familiarity" desc="اسم PNC Food معروف ومرتبط بالمطبخ، وده يقلل مقاومة الجمهور لفكرة التحميل." />
        </div>
        <FooterNote>المؤشرات العلنية الحالية المتاحة: قناة بانوراما فوود - PNC Food على YouTube تظهر 3.26M subscribers و38K videos، كما تظهر نتائج Facebook العامة إشارات بحوالي 604K likes.</FooterNote>
      </>
    )
  },
  {
    id: 3.5,
    eyebrow: "نجوم الطبخ",
    title: "محتوانا يعتمد على نجوم يثق فيهم الجمهور وينتظرهم يومياً",
    lead: "خبرة في كل المجالات بلمسة الشيفات اللي الجمهور حافظ أسمائهم وبيثق فيهم",
    image: "/fatma.jpeg",
    content: () => (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mt-4 md:mt-8 relative z-10 w-full max-w-5xl mx-auto">
        {[
          { name: 'الشيف فاطمة أبو حاتي', show: 'برنامج العزومة', img: '/fatma.jpeg' },
          { name: 'الشيف نونا', show: 'برنامج البلدي يوكل', img: '/nona.jpg' },
          { name: 'الشيف وحيد كمال', show: 'برنامج الفطاطري', img: '/wahid.jpg' },
          { name: 'الشيف آلاء الجبالي', show: 'برنامج سنة أولى طبخ', img: '/alaa.jpg' },
          { name: 'الشيف دعاء السمنودي', show: 'برنامج سر الصنعة', img: '/doaa.jpg' },
          { name: 'الشيف محمد حامد', show: 'برنامج المطعم', img: '/mohamed.jpg' }
        ].map((chef, i) => (
          <div key={i} className="group relative overflow-hidden rounded-xl md:rounded-2xl aspect-[4/5] border-2 border-slate-700/80 shadow-lg hover:border-pnc-cyan hover:shadow-[0_0_20px_rgba(38,144,137,0.4)] transition-all duration-300">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url(${chef.img})` }} />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-3 md:p-5 flex flex-col items-center flex-end pb-4 md:pb-6">
              <h3 className="text-lg md:text-xl font-bold text-white mb-2 text-center drop-shadow-md">{chef.name}</h3>
              <p className="text-pnc-orange text-xs md:text-sm font-bold px-3 py-1 bg-slate-950/80 backdrop-blur rounded-full text-center border border-white/10 w-[90%] truncate">{chef.show}</p>
            </div>
          </div>
        ))}
      </div>
    )
  },
  {
    id: 4,
    eyebrow: "المنتج المقترح",
    title: "إيه اللي الجمهور هيفتحه فعلًا؟",
    lead: "المطلوب منتج بسيط وواضح: يجمع أحسن ما في القناة، ويقدمه للجمهور بشكل عملي، سريع، ويستاهل الرجوع له.",
    image: "https://images.unsplash.com/photo-1600565193348-17ce282bac91?q=80&w=2070&auto=format&fit=crop",
    content: () => (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Card>
            <h3 className="text-2xl font-bold text-white mb-6 border-b border-slate-700 pb-4">الـ Core Experience</h3>
            <ul className="space-y-4 text-slate-300 text-lg list-disc list-inside marker:text-pnc-teal">
              <li>Hub لكل الشيفات وصفحات مميزة لكل شيف</li>
              <li>وصفات مرتبة وسهلة الحفظ والرجوع</li>
              <li>سيكشن للحلقات والفقرات المهمة</li>
              <li>Trending يبين إيه اللي الناس مهتمة بيه دلوقتي</li>
              <li>إشعارات ذكية بدل التنبيهات العشوائية</li>
            </ul>
          </Card>
          <Card className="border-pnc-teal/50 bg-gradient-to-br from-slate-900/80 to-pnc-teal/10">
            <h3 className="text-2xl font-bold text-pnc-cyan mb-6 border-b border-pnc-teal/30 pb-4">الميزة اللي تفرقنا</h3>
            <ul className="space-y-4 text-slate-200 text-lg list-disc list-inside marker:text-pnc-orange">
              <li>لكل شيف AI assistant باسمه وطريقته</li>
              <li>المستخدم يسأل على وصفة، بديل، خطوة، أو فكرة</li>
              <li>الرد دايمًا يرجع للمحتوى الحقيقي للقناة</li>
              <li>الميزة دي تشجع التحميل لأنها قيمة واضحة وفورية</li>
            </ul>
          </Card>
        </div>
        <Quote>أقوى hook تسويقي للمشروع: <span className="text-pnc-yellow">“حمّل المنصة واسأل شيفك المفضل مباشرة”</span></Quote>
      </>
    )
  },
  {
    id: 5,
    eyebrow: "القيمة الحقيقية",
    title: "المكسب مش بس تنزيلات… المكسب إننا نزود قيمة الجمهور الحالي",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974&auto=format&fit=crop",
    content: () => (
      <>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 mb-10">
          <Card><h3 className="text-xl font-bold text-white mb-3">للجمهور</h3><p className="text-slate-300">سهولة وصول، حفظ، متابعة، وتفاعل أسرع. بدل ما يدور وسط المنصات، كل حاجة قدامه مرتبة.</p></Card>
          <Card><h3 className="text-xl font-bold text-white mb-3">للقناة</h3><p className="text-slate-300">علاقة مباشرة مع المستخدم، وتنبيهات، وبيانات سلوك، وقدرة أعلى على إعادة التفاعل.</p></Card>
          <Card><h3 className="text-xl font-bold text-white mb-3">للمعلنين والرعاة</h3><p className="text-slate-300">مساحات أعمق من مجرد إعلان: رعاية وصفات، collections، مسابقات، وتكاملات مستقبلية.</p></Card>
        </div>
        <Card className="!p-8">
          <h3 className="text-lg font-bold text-white mb-6">سلم القيمة التجاري للتفاعل</h3>
          <div className="flex flex-col gap-6">
            {[
              { l: 'قيمة المشاهدة فقط', w: '38%', c: 'bg-slate-500', v: 'منخفضة نسبيًا' },
              { l: 'قيمة المشاهدة + الرجوع', w: '66%', c: 'bg-blue-400', v: 'أفضل' },
              { l: 'قيمة المشاهدة + الرجوع + التفاعل', w: '84%', c: 'bg-pnc-cyan', v: 'عالية' },
              { l: 'قيمة الجمهور المملوك مباشرة (المنصة)', w: '100%', c: 'bg-gradient-to-l from-pnc-yellow to-pnc-orange', v: 'أعلى قيمة' },
            ].map((bar, i) => (
              <div key={i} className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                <div className="w-48 text-slate-300 font-medium shrink-0">{bar.l}</div>
                <div className="flex-1 h-4 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                  <motion.div initial={{ width: 0 }} animate={{ width: bar.w }} transition={{ duration: 1, delay: 0.3 * i }} className={`h-full ${bar.c}`} />
                </div>
                <div className="w-24 font-bold text-white shrink-0 text-left">{bar.v}</div>
              </div>
            ))}
          </div>
        </Card>
      </>
    )
  },
  {
    id: 6,
    eyebrow: "الأرقام المتوقعة",
    title: "إيه الأرقام الواقعية اللي ممكن نوصل لها في أول 12 شهر؟",
    lead: "عشان نبقى واضحين مع الـ Board: الأرقام دي مش وعود، لكنها range استرشادي منطقي مبني على قوة الجمهور الحالية.",
    image: "https://images.unsplash.com/photo-1495521821757-a1efb6729352?q=80&w=2026&auto=format&fit=crop",
    content: () => (
      <>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card>
            <div className="inline-block px-4 py-1.5 rounded-full bg-slate-800 text-pnc-cyan text-sm font-bold mb-4">سيناريو محافظ</div>
            <h3 className="text-xl font-bold text-white mb-6">لو الإطلاق كان هادي</h3>
            <div className="space-y-4">
              <div className="flex justify-between border-b border-slate-700/50 pb-2"><span className="text-slate-400">تنزيلات/تسجيلات</span><b className="text-white">80K – 120K</b></div>
              <div className="flex justify-between border-b border-slate-700/50 pb-2"><span className="text-slate-400">نشاط شهري</span><b className="text-white">20K – 30K</b></div>
              <div className="flex justify-between border-b border-slate-700/50 pb-2"><span className="text-slate-400">Opt-in إشعارات</span><b className="text-white">25% – 35%</b></div>
              <div className="flex justify-between"><span className="text-slate-400">أسئلة AI</span><b className="text-white">100K+</b></div>
            </div>
          </Card>
          <Card className="ring-2 ring-pnc-orange bg-slate-800/80 transform md:-translate-y-2 relative shadow-2xl">
            <div className="absolute -top-4 right-6 bg-pnc-orange text-slate-900 px-4 py-1 rounded-full text-sm font-extrabold shadow-lg">السيناريو المرجّح</div>
            <h3 className="text-2xl font-bold text-white mt-4 mb-6">لو الإطلاق اتعمل صح</h3>
            <div className="space-y-4 text-lg">
              <div className="flex justify-between border-b border-slate-600 pb-2"><span className="text-slate-300">تنزيلات/تسجيلات</span><b className="text-pnc-yellow">150K – 250K</b></div>
              <div className="flex justify-between border-b border-slate-600 pb-2"><span className="text-slate-300">نشاط شهري</span><b className="text-pnc-yellow">40K – 70K</b></div>
              <div className="flex justify-between border-b border-slate-600 pb-2"><span className="text-slate-300">Opt-in إشعارات</span><b className="text-pnc-yellow">35% – 45%</b></div>
              <div className="flex justify-between"><span className="text-slate-300">جلسات شهرية</span><b className="text-pnc-yellow">300K – 600K</b></div>
            </div>
          </Card>
          <Card>
            <div className="inline-block px-4 py-1.5 rounded-full bg-slate-800 text-pnc-teal text-sm font-bold mb-4">سيناريو قوي</div>
            <h3 className="text-xl font-bold text-white mb-6">لو اتدعم إعلاميًا بقوة</h3>
            <div className="space-y-4">
              <div className="flex justify-between border-b border-slate-700/50 pb-2"><span className="text-slate-400">تنزيلات/تسجيلات</span><b className="text-white">300K+</b></div>
              <div className="flex justify-between border-b border-slate-700/50 pb-2"><span className="text-slate-400">نشاط شهري</span><b className="text-white">80K – 120K</b></div>
              <div className="flex justify-between border-b border-slate-700/50 pb-2"><span className="text-slate-400">Opt-in إشعارات</span><b className="text-white">45%+</b></div>
              <div className="flex justify-between"><span className="text-slate-400">فرص رعاية</span><b className="text-white">متعددة</b></div>
            </div>
          </Card>
        </div>
        <FooterNote>المعدلات المرجعية مبنية على مبدأ أن push notifications تدعم الاحتفاظ بالمستخدمين، وأن التحويل من audience قائم لـ owned app audience يكون أعلى عندما تكون القيمة واضحة ومباشرة.</FooterNote>
      </>
    )
  },
  {
    id: 7,
    eyebrow: "العائد المستقبلي",
    title: "فين العائد التجاري بعد ما نبني المنصة؟",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=2070&auto=format&fit=crop",
    content: () => (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Card>
            <h3 className="text-2xl font-bold text-pnc-yellow mb-6">عوائد مباشرة</h3>
            <ul className="space-y-4 text-slate-300 text-lg list-disc list-inside">
              <li>رعاية sections أو مواسم كاملة</li>
              <li>مسابقات برعاية brands</li>
              <li>Collections branded للوصفات أو الفقرات</li>
              <li>مساحات إعلانية داخلية بشكل راقٍ وغير مزعج</li>
            </ul>
          </Card>
          <Card>
            <h3 className="text-2xl font-bold text-pnc-cyan mb-6">عوائد غير مباشرة</h3>
            <ul className="space-y-4 text-slate-300 text-lg list-disc list-inside">
              <li>رفع قيمة الرعاية على القناة نفسها</li>
              <li>زيادة ولاء الجمهور وعودة المشاهدة</li>
              <li>إطالة عمر المحتوى بدل ما يستهلك مرة واحدة</li>
              <li>بناء بيانات تساعد في قرارات البرامج والمواسم</li>
            </ul>
          </Card>
        </div>
        <Quote>المنصة هنا بتضيف <span className="text-pnc-yellow">طبقة قيمة فوق المحتوى</span>… ودي الطبقة اللي تفتح باب business جديد، مش مجرد تكلفة تشغيل.</Quote>
      </>
    )
  },
  {
    id: 8,
    eyebrow: "خطة الإطلاق",
    title: "هنطلعها إزاي من غير تعقيد؟",
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=1977&auto=format&fit=crop",
    content: () => (
      <>
        <StepFlow steps={[
          {k: 'المرحلة 1', t: 'نسخة أولى مركزة', x: 'Chef hub + وصفات + حلقات + إشعارات + trending'},
          {k: 'المرحلة 2', t: 'دفع إعلامي', x: 'إعلان على القناة، المحتوى، والـ promos من الشيفات'},
          {k: 'المرحلة 3', t: 'تفعيل المواسم', x: 'رمضان، الأعياد، الصيف، والجداول الشهرية'},
          {k: 'المرحلة 4', t: 'توسيع القيمة', x: 'Community, challenges, partnerships'},
        ]} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Card>
            <h3 className="text-xl font-bold text-white mb-3">الهدف من النسخة الأولى</h3>
            <p className="text-slate-300 leading-relaxed">نثبت إن الجمهور بيحمّل، ويرجع، ويستفيد من المنصة. نختبر الفكرة السوقية بسرعة وبشكل ذكي ومباشر.</p>
          </Card>
          <Card>
            <h3 className="text-xl font-bold text-white mb-3">الهدف من النسخة الثانية</h3>
            <p className="text-slate-300 leading-relaxed">نزود التفاعل ونحوّل المنصة من utility إلى habit: إشعارات، مناقشات، ومحتوى موسمي حي.</p>
          </Card>
        </div>
      </>
    )
  },
  {
    id: 9,
    eyebrow: "عوامل النجاح والمخاطر",
    title: "إيه اللي ينجح المشروع… وإيه اللي يبوظه؟",
    image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?q=80&w=2070&auto=format&fit=crop",
    content: () => (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Card className="border-t-4 border-t-pnc-teal">
            <h3 className="text-2xl font-bold text-white mb-6">عوامل النجاح</h3>
            <ul className="space-y-4 text-slate-300 text-lg list-disc list-inside">
              <li>التركيز على الشيفات كنجوم، مش أرشيف وصفات</li>
              <li>تقديم قيمة واضحة جدًا من أول زيارة</li>
              <li>إشعارات مفيدة وموجهة، مش spam</li>
              <li>تجربة سهلة وسريعة وواضحة</li>
              <li>خطة ترويج قوية جوه القناة نفسها</li>
            </ul>
          </Card>
          <Card className="border-t-4 border-t-red-500">
            <h3 className="text-2xl font-bold text-white mb-6">المخاطر لو اتعمل غلط</h3>
            <ul className="space-y-4 text-slate-300 text-lg list-disc list-inside">
              <li>يبقى مجرد wrapper ليوتيوب</li>
              <li>الجمهور يحملوه مرة ومايرجعولوش</li>
              <li>إشعارات كتير من غير قيمة أو سياق</li>
              <li>AI يدي إجابات عامة وضعيفة</li>
              <li>مفيش ownership داخلي بعد الإطلاق</li>
            </ul>
          </Card>
        </div>
        <Quote>الخلاصة: النجاح مش في إننا نعمل app… النجاح في إننا نعمل <span className="text-pnc-teal">سبب حقيقي يخلي الناس ترجع</span>.</Quote>
      </>
    )
  },
  {
    id: 10,
    eyebrow: "القرار المطلوب",
    title: "المطلوب من مجلس الإدارة",
    image: "https://images.unsplash.com/photo-1414235077428-33898bd12277?q=80&w=2070&auto=format&fit=crop",
    content: () => (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Card>
            <h3 className="text-2xl font-bold text-pnc-orange mb-6">اعتماد مبدئي على 3 نقاط</h3>
            <ul className="space-y-4 text-slate-300 text-lg list-decimal list-inside marker:text-pnc-yellow marker:font-bold">
              <li>الموافقة على الاتجاه الاستراتيجي: <span className="text-white">من قناة إلى منصة</span></li>
              <li>الموافقة على تطوير نسخة أولى مركزة وسريعة</li>
              <li>الموافقة على دراسة تنفيذية للميزانية والجدول</li>
            </ul>
          </Card>
          <Card>
            <h3 className="text-2xl font-bold text-pnc-cyan mb-6">النتيجة المتوقعة من القرار</h3>
            <ul className="space-y-4 text-slate-300 text-lg list-disc list-inside marker:text-pnc-teal">
              <li>فتح مسار نمو جديد للقناة</li>
              <li>رفع قيمة المحتوى الحالي والمستقبلي</li>
              <li>تقوية العلاقة المباشرة مع الجمهور</li>
              <li>خلق أصل رقمي قابل للتوسع والرعاية</li>
            </ul>
          </Card>
        </div>
        <Quote>ده مشروع ينفع ينقل PNC Food من “قناة ناجحة” إلى <span className="text-pnc-yellow">منصة ناجحة</span>… والفرق بين الاتنين كبير جدًا على المدى المتوسط والبعيد.</Quote>
        <FooterNote>
          <b>ملاحظات:</b> التقديرات المستقبلية داخل العرض هي ranges استرشادية لاتخاذ قرار استراتيجي، وليست forecast مالي نهائي. وقد تعمّدت صياغتها بشكل محافظ نسبيًا لأن الأداء الفعلي سيتحدد وفق جودة الإطلاق، وتفاعل الجمهور.
        </FooterNote>
      </>
    )
  }
];

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);

  const goToNextSlide = useCallback(() => {
    if (currentSlide < slidesData.length - 1) {
      setDirection(1);
      setCurrentSlide(prev => prev + 1);
    }
  }, [currentSlide]);

  const goToPrevSlide = useCallback(() => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide(prev => prev - 1);
    }
  }, [currentSlide]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToNextSlide(); // RTL next
      if (e.key === 'ArrowRight') goToPrevSlide(); // RTL prev
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNextSlide, goToPrevSlide]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.98
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.4 } }
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 1.02,
      transition: { x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.4 } }
    })
  };

  const slide = slidesData[currentSlide];

  return (
    <div className="relative w-screen h-screen bg-slate-950 flex flex-col justify-center items-center overflow-hidden font-sans" dir="rtl">
      
      {/* Header / Logo */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="absolute top-0 left-0 right-0 p-6 md:p-8 flex justify-between items-center z-50 pointer-events-none"
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden flex items-center justify-center bg-white/5 backdrop-blur-sm shadow-[0_0_20px_rgba(38,144,137,0.3)] border border-white/10">
            <img src="/logo.png" alt="PNC Food Hub" className="w-[85%] h-[85%] object-contain drop-shadow-md" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pnc-cyan to-pnc-teal leading-tight drop-shadow-sm">PNC</h1>
            <p className="text-xs md:text-sm font-bold text-pnc-orange uppercase tracking-wider">Food Hub</p>
          </div>
        </div>
        <div className="text-slate-400 flex items-center gap-2 text-sm font-semibold tracking-wider">
          <Presentation className="w-4 h-4" /> العرض التقديمي
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div className="w-full h-full relative">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full flex items-center justify-center pt-16 pb-24 overflow-y-auto"
          >
            {/* Background Image Layer */}
            <div 
              className="fixed inset-0 z-0 bg-cover bg-center transition-transform duration-1000 scale-105"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-[2px]" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
            </div>

            {/* Slide Container */}
            <div className="relative z-10 w-full max-w-6xl px-6 md:px-12 py-8 mt-auto mb-auto">
              {/* Header block */}
              <div className="mb-6 md:mb-8">
                <span className="inline-block px-5 py-2 rounded-full bg-slate-900/60 backdrop-blur border border-white/10 text-pnc-orange font-bold text-sm md:text-base mb-6 tracking-wide shadow-lg shadow-black/20">
                  {currentSlide + 1}. {slide.eyebrow}
                </span>
                <h1 
                  className="text-3xl md:text-5xl lg:text-5xl font-extrabold text-white leading-[1.3] md:leading-[1.25] mb-6 drop-shadow-md max-w-4xl"
                  dangerouslySetInnerHTML={{ __html: slide.title }}
                />
                {slide.lead && (
                  <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-4xl font-medium drop-shadow-sm">
                    {slide.lead}
                  </p>
                )}
              </div>
              
              {/* Specialized Content */}
              {slide.content()}
            </div>

          </motion.div>
        </AnimatePresence>

        {/* Navigation Controls */}
        <div className="absolute bottom-6 md:bottom-8 right-6 md:right-8 left-6 md:left-8 flex flex-col md:flex-row justify-between items-center gap-4 z-50 pointer-events-none">
          
          {/* Progress Indicators */}
          <div className="flex gap-2 pointer-events-auto shrink-0 order-2 md:order-1">
            {slidesData.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => {
                  setDirection(idx > currentSlide ? 1 : -1);
                  setCurrentSlide(idx);
                }}
                className={`h-2 transition-all duration-300 rounded-full ${
                  currentSlide === idx 
                    ? 'w-12 bg-gradient-to-r from-pnc-orange to-pnc-yellow shadow-[0_0_10px_rgba(254,191,3,0.5)]' 
                    : 'w-4 bg-slate-600 hover:bg-pnc-teal'
                }`}
                aria-label={`شريحة ${idx + 1}`}
              />
            ))}
          </div>

          <div className="flex gap-4 pointer-events-auto order-1 md:order-2 self-end md:self-auto">
            {/* Prev Arrow (Point Right for RTL) */}
            <button 
              onClick={goToPrevSlide}
              disabled={currentSlide === 0}
              className={`p-4 rounded-full flex items-center justify-center transition-all bg-slate-800/80 backdrop-blur border border-slate-700
                ${currentSlide === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-pnc-teal hover:border-pnc-cyan text-white hover:shadow-[0_0_15px_rgba(38,144,137,0.5)]'}`}
            >
              <ChevronRight className="w-7 h-7" />
            </button>
            {/* Next Arrow (Point Left for RTL) */}
            <button 
              onClick={goToNextSlide}
              disabled={currentSlide === slidesData.length - 1}
              className={`p-4 rounded-full flex items-center justify-center transition-all bg-slate-800/80 backdrop-blur border border-slate-700
                ${currentSlide === slidesData.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-pnc-orange hover:border-pnc-yellow text-slate-100 hover:text-slate-900 group shadow-[0_0_15px_rgba(254,191,3,0.3)]'}`}
            >
              <ChevronLeft className="w-7 h-7 group-hover:text-slate-900 transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
