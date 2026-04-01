import { useEffect, useState } from "react";
import { ArrowRight, User, Star, Copy } from "lucide-react";
import { ThemeToggle } from "./ui/theme-toggle";
import { Button } from "./ui/button";
import { DockDemo } from "./ui/dock-demo";

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute top-3 right-3 p-2 rounded-md bg-white/80 hover:bg-white border border-card-border transition-all duration-200 group"
      title="Copy prompt"
    >
      <Copy className="w-4 h-4 text-gray-600 group-hover:text-gray-800" />
      {copied && (
        <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
          Copied!
        </span>
      )}
    </button>
  );
};

const contentData = [{
  phase: "Phase 1: Lay the Foundation",
  phaseNumber: "01",
  chapters: [{
    number: "1",
    title: "Plan before you prompt",
    content: <div className="space-y-6">
        <p className="text-gray-600 leading-relaxed">
          Before using Lovable, define what you're building. Skipping this step is like starting a painting without deciding what you're painting. Use a quick planning session—pen and paper, voice notes, ChatGPT, whatever works—to answer these four questions:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-600">
          <li>What is this product or feature?</li>
          <li>Who is it for?</li>
          <li>Why will they use it?</li>
          <li>What is the one key action the user should take?</li>
        </ul>
        <p className="text-gray-600 leading-relaxed">
          You're not writing a spec doc. You're setting direction. The more aligned your thinking, the sharper your prompts. Vague ideas produce vague outputs. Clear thinking leads to clear results.
        </p>
        <div className="space-y-3">
          <p className="text-gray-800 font-medium">Prompt Example:</p>
          <div className="relative bg-[#F7F4ED] p-4 pr-12 rounded-lg border-card-border border">
            <CopyButton text="Build a one-page site for a budgeting app targeted at Gen Z freelancers. The main CTA should be 'Start Saving Smarter.' Focus on a bold, expressive aesthetic with large text and punchy colors." />
            <code className="text-sm text-gray-800 block">
              "Build a one-page site for a budgeting app targeted at Gen Z freelancers. The main CTA should be 'Start Saving Smarter.' Focus on a bold, expressive aesthetic with large text and punchy colors."
            </code>
          </div>
        </div>
      </div>
  }, {
    number: "2",
    title: "Map the User Journey Visually",
    content: <div className="space-y-6">
        <p className="text-gray-600 leading-relaxed">
          Design isn't about individual screens—it's about what happens between them. The best outputs in Lovable come from clear, logical flow. Map the journey your user takes from landing on the page to completing a key action.
        </p>
        <div className="space-y-3">
          <p className="text-gray-700 font-medium">Think in transitions:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>What does the user see first?</li>
            <li>What builds trust?</li>
            <li>What gives them confidence to act?</li>
            <li>Where does that action lead?</li>
          </ul>
        </div>
        <p className="text-gray-600 leading-relaxed">
          Even a simple 3-step sketch—Hero → Features → CTA—can make your prompts 10x more effective.
        </p>
        
        {/* Visual Flow Diagram */}
        <div className="bg-[#F7F4ED] p-6 rounded-lg border-card-border border">
          <p className="text-gray-700 font-medium text-sm mb-4">Visual Flow Diagram:</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <div className="bg-white px-4 py-2 rounded-md border-card-border border text-sm font-medium text-gray-700 text-center min-w-[120px]">
              Hero
            </div>
            <ArrowRight className="w-5 h-5 text-gray-500 rotate-90 sm:rotate-0 flex-shrink-0" />
            <div className="bg-white px-4 py-2 rounded-md border-card-border border text-sm font-medium text-gray-700 text-center min-w-[120px]">
              Value Prop Grid
            </div>
            <ArrowRight className="w-5 h-5 text-gray-500 rotate-90 sm:rotate-0 flex-shrink-0" />
            <div className="bg-white px-4 py-2 rounded-md border-card-border border text-sm font-medium text-gray-700 text-center min-w-[120px]">
              Testimonial
            </div>
            <ArrowRight className="w-5 h-5 text-gray-500 rotate-90 sm:rotate-0 flex-shrink-0" />
            <div className="bg-white px-4 py-2 rounded-md border-card-border border text-sm font-medium text-gray-700 text-center min-w-[120px]">
              CTA Button
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
          <p className="text-gray-700 italic">
            "You're not stacking blocks. You're guiding behavior. Every section should have a reason to exist—and a reason to lead to the next one."
          </p>
        </div>
      </div>
  }, {
    number: "3",
    title: "Get the Design Right First",
    content: <div className="space-y-6">
        <p className="text-gray-600 leading-relaxed">
          Your visual language is a foundation, not a polish layer. Lovable needs to know the look and feel you want—early. Otherwise, your interface might function but feel totally wrong. Do not fix design problems later. Decide them up front.
        </p>
        <div className="space-y-3">
          <p className="text-gray-700 font-medium">Choose a direction:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>Calm and elegant?</li>
            <li>Bold and disruptive?</li>
            <li>Premium and sleek?</li>
          </ul>
        </div>
        <p className="text-gray-600 leading-relaxed">
          Then feed that style directly into your prompt using buzzwords, tone descriptors, and UI patterns.
        </p>
        <p className="text-gray-600 leading-relaxed">
          You can even create a "starter style prompt" and reuse it across all sections for consistency.
        </p>
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
          <p className="text-gray-700 italic">
            "You don't prompt your way into good design. You prompt from it."
          </p>
        </div>
        <div className="space-y-3">
          <p className="text-gray-800 font-medium">Prompt Example:</p>
          <div className="relative bg-[#F7F4ED] p-4 pr-12 rounded-lg border-card-border border">
            <CopyButton text="Use a calm, wellness-inspired design. Soft gradients, muted earth tones, round corners, and generous padding. Font is 'Inter'. Overall tone should feel gentle and reassuring." />
            <code className="text-sm text-gray-800 block">
              "Use a calm, wellness-inspired design. Soft gradients, muted earth tones, round corners, and generous padding. Font is 'Inter'. Overall tone should feel gentle and reassuring."
            </code>
          </div>
        </div>
      </div>
  }]
}, {
  phase: "Phase 2: Think in Systems",
  phaseNumber: "02",
  chapters: [{
    number: "4",
    title: "Prompt by Component, Not Page",
    content: <div className="space-y-6">
        <p className="text-gray-600 leading-relaxed">
          Lovable works best when you build your UI in modular parts—not full pages at once. Asking it to generate an entire landing page is like dumping a recipe into a blender. You'll get something, but it won't be usable.
        </p>
        <p className="text-gray-600 leading-relaxed">
          Instead, approach your prompts like building with Lego bricks. Each block should have one clear purpose and structure: a hero section, a feature grid, a testimonial slider, a pricing table. Build one, review it, refine it, then move to the next.
        </p>
        <p className="text-gray-600 leading-relaxed">
          When you prompt by component, you gain clarity, control, and flexibility. If something doesn't look right, you can fix just that block instead of re-prompting an entire page. This also helps you scale your design thinking across multiple pages—components can be reused and adapted without rewriting from scratch.
        </p>
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
          <p className="text-gray-700 italic">
            "A full-page prompt gets you noise. A section-based prompt gets you signal."
          </p>
        </div>
        <div className="space-y-3">
          <p className="text-gray-800 font-medium">Prompt Example:</p>
          <div className="relative bg-[#F7F4ED] p-4 pr-12 rounded-lg border-card-border border">
            <CopyButton text="Create a floating menu bar with glassmorphism effect. Include Home, Search, Music, Favorites, Add, Profile, and Settings icons. Add gentle floating animation and smooth hover interactions." />
            <code className="text-sm text-gray-800 block">
              "Create a floating menu bar with glassmorphism effect. Include Home, Search, Music, Favorites, Add, Profile, and Settings icons. Add gentle floating animation and smooth hover interactions."
            </code>
          </div>
        </div>
        
        {/* Dock Component Demo */}
        <div className="mt-6">
          <DockDemo />
        </div>
      </div>
  }, {
    number: "5",
    title: "Design with Real Content",
    content: <div className="space-y-6">
        <p className="text-gray-600 leading-relaxed">
          Lovable does not work well with placeholder content like "lorem ipsum" or "feature 1 / feature 2." The model is trained to respond to structure and intent—and the fastest way to show intent is to use real words.
        </p>
        <p className="text-gray-600 leading-relaxed">
          Even if your final copy isn't ready, use copy that reflects your message. If you're building a page for a meditation app, write what a user would actually read. Don't fake it.
        </p>
        <p className="text-gray-600 leading-relaxed">
          This doesn't just help Lovable generate better layouts and spacing—it helps you make smarter design decisions. A real headline might need 2 lines instead of 1. A CTA might work better if it's a verb instead of a noun. Placeholder text hides those issues. Real content reveals them early.
        </p>
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
          <p className="text-gray-700 italic">
            "Design loves constraints. Real content creates the right ones."
          </p>
        </div>
        <div className="space-y-3">
          <p className="text-gray-800 font-medium">Prompt Example:</p>
          <div className="relative bg-[#F7F4ED] p-4 pr-12 rounded-lg border-card-border border">
            <CopyButton text="Hero section with headline: 'Design Calmly.' Subtext: 'Turn stress into structure with Lovable.' CTA: 'Start Building Free.' Use copy-centered layout with generous vertical spacing." />
            <code className="text-sm text-gray-800 block">
              "Hero section with headline: 'Design Calmly.' Subtext: 'Turn stress into structure with Lovable.' CTA: 'Start Building Free.' Use copy-centered layout with generous vertical spacing."
            </code>
          </div>
        </div>
      </div>
  }, {
    number: "6",
    title: "Speak Atomic: Buttons, Cards, Modals",
    content: <div className="space-y-6">
        <p className="text-gray-600 leading-relaxed">
          Lovable thinks in atoms. The smaller and more specific your UI language, the better it performs. Instead of asking for a "section with a signup," say, "Add a form with an input field for email and a rounded CTA button." These atomic instructions get interpreted as native patterns.
        </p>
        <p className="text-gray-600 leading-relaxed">
          Think like a system. Describe cards, badges, toggles, chips, form fields, dropdowns, etc. Don't say "a user interface" when you can say "a modal with a success toast after submit."
        </p>
        <p className="text-gray-600 leading-relaxed">
          This atomic vocabulary also lets you layer complexity gradually. Start with a card. Then add a badge. Then add hover states. Each layer builds naturally on the last. This gives you more control and higher fidelity output—without rewriting prompts.
        </p>
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
          <p className="text-gray-700 italic">
            "The smaller the part, the smarter the response."
          </p>
        </div>

        {/* Visual Examples Grid */}
        <div className="bg-transparent p-6 rounded-lg px-0 py-0">
          <p className="text-gray-700 font-medium text-sm mb-4">Atomic UI Elements Examples:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Button Example */}
            <div className="p-4 rounded-lg border-card-border border text-center space-y-3 bg-transparent">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Button</p>
              <Button className="w-full">Follow User</Button>
              <p className="text-xs text-gray-600">"Create a follow button with hover states"</p>
            </div>
            
            {/* Card Example */}
            <div className="p-4 rounded-lg border-card-border border text-center space-y-3 bg-transparent">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Card</p>
              <div className="bg-gray-50 p-3 rounded-md border-card-border border">
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium">John Doe</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-500" />
                  <span className="text-xs text-gray-600">4.9 rating</span>
                </div>
              </div>
              <p className="text-xs text-gray-600">"Card with user info and rating"</p>
            </div>
            
            {/* Toggle Example */}
            <div className="p-4 rounded-lg border-card-border border text-center space-y-3 bg-transparent">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Toggle</p>
              <div className="flex justify-center">
                <ThemeToggle />
              </div>
              <p className="text-xs text-gray-600">"Theme toggle with smooth animation"</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-gray-800 font-medium">Prompt Example:</p>
          <div className="relative bg-[#F7F4ED] p-4 pr-12 rounded-lg border-card-border border">
            <CopyButton text="Create a card with a user profile picture, name, and a follow button. Add a badge for verified users, and show a tooltip when hovering over the badge." />
            <code className="text-sm text-gray-800 block">
              "Create a card with a user profile picture, name, and a follow button. Add a badge for verified users, and show a tooltip when hovering over the badge."
            </code>
          </div>
        </div>
      </div>
  }, {
    number: "7",
    title: "Use Buzzwords to Dial In Aesthetic",
    content: <div className="space-y-6">
        <p className="text-gray-600 leading-relaxed">
          Visual style is one of the most important—and most misunderstood—parts of prompting in Lovable. It's not enough to describe layout. You need to guide the tool on vibe. Buzzwords are the fastest way to do that.
        </p>
        <p className="text-gray-600 leading-relaxed">
          Lovable understands terms like "minimal," "expressive," "cinematic," "playful," "premium," and "developer-focused." These aren't fluff—they're promptable parameters that influence typography, spacing, shadow, border radius, and color palette.
        </p>
        <p className="text-gray-600 leading-relaxed">
          Use these words early in your prompts. Better yet, include them in every section. You'll get cohesive designs across the board and avoid the dreaded "default UI" look.
        </p>
        <p className="text-gray-600 leading-relaxed">
          You can also mix and match buzzwords to evolve your tone. A page can start "bold and disruptive" in the hero and become "calm and reassuring" in the pricing section. You're not stuck with one style—you're designing with intention.
        </p>
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
          <p className="text-gray-700 italic">
            "Design isn't just structure. It's tone. Buzzwords define it."
          </p>
        </div>
        <div className="space-y-3">
          <p className="text-gray-800 font-medium">Prompt Example:</p>
          <div className="relative bg-[#F7F4ED] p-4 pr-12 rounded-lg border-card-border border">
            <CopyButton text="Design a landing page hero that feels premium and cinematic. Use layered depth, translucent surfaces, soft motion blur, and dramatic contrast between headline and background." />
            <code className="text-sm text-gray-800 block">
              "Design a landing page hero that feels premium and cinematic. Use layered depth, translucent surfaces, soft motion blur, and dramatic contrast between headline and background."
            </code>
          </div>
        </div>
      </div>
  }]
}, {
  phase: "Phase 3: Build with Precision",
  phaseNumber: "03",
  chapters: [{
    number: "8",
    title: "Use Prompt Patterns for Layouts",
    content: <div className="space-y-6">
        <p className="text-gray-600 leading-relaxed">
          Prompts are easier to write—and far more effective—when you use structured, repeatable patterns. Think of them as layout recipes. Rather than trying to explain your layout from scratch every time, describe it using a consistent rhythm.
        </p>
        <p className="text-gray-600 leading-relaxed">
          A good layout prompt breaks the section into visual parts, clarifies their order, and defines how they're styled. Most patterns follow a "header → content → action" structure, but you can customize that flow depending on what you're designing.
        </p>
        <p className="text-gray-600 leading-relaxed">
          Start building a personal prompt library. For example, write a go-to structure for a feature grid, a testimonial slider, or a pricing table. Reuse and remix these patterns with slight modifications to match different pages.
        </p>
        <p className="text-gray-600 leading-relaxed">
          This isn't about being rigid. It's about being efficient. Lovable responds best to prompt language that is structured, scoped, and predictable. Prompt patterns make you faster and your output more consistent across screens.
        </p>
        <div className="space-y-3">
          <p className="text-gray-800 font-medium">Prompt Example:</p>
          <div className="relative bg-[#F7F4ED] p-4 pr-12 rounded-lg border-card-border border">
            <CopyButton text="Create a feature section with a centered headline, followed by three horizontally aligned cards. Each card includes an icon on top, a headline, and a short description. Cards should have soft shadows and lift on hover." />
            <code className="text-sm text-gray-800 block">
              "Create a feature section with a centered headline, followed by three horizontally aligned cards. Each card includes an icon on top, a headline, and a short description. Cards should have soft shadows and lift on hover."
            </code>
          </div>
        </div>
      </div>
  }, {
    number: "9",
    title: "Add Visuals via URL",
    content: <div className="space-y-6">
        <p className="text-gray-600 leading-relaxed">
          Want your layout to feel real? Drop in product demos, Midjourney-generated clips, or tutorial videos using URLs. Lovable supports video embeds when prompted clearly.
        </p>
        <div className="space-y-3">
          <p className="text-gray-700 font-medium">Prompt for:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>Placement (e.g. below hero or inside a feature card)</li>
            <li>Style (e.g. rounded corners, autoplay, muted)</li>
            <li>Context (why it's there)</li>
          </ul>
        </div>
        <div className="space-y-3">
          <p className="text-gray-800 font-medium">Prompt Example:</p>
          <div className="relative bg-[#F7F4ED] p-4 pr-12 rounded-lg border-card-border border">
            <CopyButton text="Embed a product demo video from Midjourney. Use this URL: [your-link.mp4]. Place it below the feature section in a full-width card with a soft shadow." />
            <code className="text-sm text-gray-800 block">
              "Embed a product demo video from Midjourney. Use this URL: [your-link.mp4]. Place it below the feature section in a full-width card with a soft shadow."
            </code>
          </div>
        </div>

        {/* Video Container */}
        <div className="relative w-full h-64 rounded-lg overflow-hidden">
          <video
            src="https://cdn.midjourney.com/video/cb84f296-92a0-4a37-a0e3-1c9c95299488/0.mp4"
            autoPlay
            muted
            loop
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      </div>
  }, {
    number: "10",
    title: "Layer Context with the Edit Button",
    content: <div className="space-y-6">
        <p className="text-gray-600 leading-relaxed">
          The edit button is one of the most powerful features in Lovable—but only if you use it properly. Instead of rewriting full prompts when something needs to change, use the edit function to focus on specific layers or elements. This lets you iterate quickly without disturbing what's already working.
        </p>
        <p className="text-gray-600 leading-relaxed">
          Think of edits like design overrides. They're not replacements—they're adjustments. For example, you can select a CTA button and change just the copy, or tweak a card layout without affecting the typography of the entire section.
        </p>
        <p className="text-gray-600 leading-relaxed">
          This keeps your project clean and modular. You avoid prompt bloat, you move faster, and you reduce the risk of breaking something that was already fine. Editing also gives you more confidence to experiment—since you're not starting over every time.
        </p>
        <p className="text-gray-600 leading-relaxed">
          When editing, be precise in your language. Say exactly what you want to change and what should stay the same. Use direction like "replace," "update," or "adjust" instead of general statements like "make this better."
        </p>
        <div className="space-y-3">
          <p className="text-gray-800 font-medium">Prompt Example (within edit):</p>
          <div className="relative bg-[#F7F4ED] p-4 pr-12 rounded-lg border-card-border border">
            <CopyButton text="Change the CTA button text to 'Get Started' and increase the padding to 24px horizontal. Keep the existing background color and font." />
            <code className="text-sm text-gray-800 block">
              "Change the CTA button text to 'Get Started' and increase the padding to 24px horizontal. Keep the existing background color and font."
            </code>
          </div>
        </div>
      </div>
  }]
}, {
  phase: "Phase 4: Iterate and Ship",
  phaseNumber: "04",
  chapters: [{
    number: "11",
    title: "Build with Supabase in Mind",
    content: <div className="space-y-6">
        <p className="text-gray-600 leading-relaxed">
          Designing a layout is just one part of building a product. If you want your Lovable projects to do more than look good, you need to think about how they'll actually work—and Supabase is a great place to start.
        </p>
        <p className="text-gray-600 leading-relaxed">
          Supabase handles user authentication, databases, storage, and even edge functions—all in a way that pairs well with modern frontends. And Lovable lets you shape your UI to match these real-world behaviors right from the prompt.
        </p>
        <p className="text-gray-600 leading-relaxed">
          When you're designing with Supabase in mind, start by anticipating:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-600">
          <li><strong>Auth logic</strong> — What should the UI show if the user is logged in vs logged out?</li>
          <li><strong>Dynamic content</strong> — Are you pulling user data, posts, items, or metrics from a table?</li>
          <li><strong>States</strong> — What happens if the data is empty, still loading, or fails?</li>
        </ul>
        <p className="text-gray-600 leading-relaxed">
          This early thinking helps you prompt smarter sections and makes development smoother later.
        </p>
        <div className="space-y-3">
          <p className="text-gray-800 font-medium">Prompt Example:</p>
          <div className="relative bg-[#F7F4ED] p-4 pr-12 rounded-lg border-card-border border">
            <CopyButton text="If the user is logged in via Supabase, show their profile image and name in the top right. If not, display a 'Log In' button and route them to the auth screen." />
            <code className="text-sm text-gray-800 block">
              "If the user is logged in via Supabase, show their profile image and name in the top right. If not, display a 'Log In' button and route them to the auth screen."
            </code>
          </div>
        </div>
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
          <p className="text-gray-700 italic">
            <strong>Tip:</strong> You don't need a working backend during design—but shaping your UI as if it's already there is how you future-proof your layout.
          </p>
        </div>
      </div>
  }, {
    number: "12",
    title: "Version Control is Your Friend",
    content: <div className="space-y-6">
        <p className="text-gray-600 leading-relaxed">
          Lovable autosaves your changes, but that doesn't mean you should move fast without thinking. If you're not keeping track of what you changed and why, you're just making noise—and you'll lose control quickly.
        </p>
        <p className="text-gray-600 leading-relaxed">
          Good versioning isn't about naming files. It's about thinking in iterations. Make one meaningful change at a time. Update your hero copy. Add a feature grid. Adjust the layout. Check the result. Then move forward.
        </p>
        <p className="text-gray-600 leading-relaxed">
          This is how real design systems are built—layer by layer, with intention.
        </p>
        <p className="text-gray-600 leading-relaxed">
          Even though Lovable manages the versions in the background, adopt your own system:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-600">
          <li>Think in milestones (e.g. layout locked, content added, logic wired)</li>
          <li>Use notes in your prompts (e.g. "Changed CTA text and adjusted card spacing")</li>
          <li>Preview before major changes, and duplicate if you're about to take a risky leap</li>
        </ul>
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
          <p className="text-gray-700 italic">
            "Autosave doesn't mean auto-organized. Build intentionally. Iterate with awareness."
          </p>
        </div>
        <div className="space-y-3">
          <p className="text-gray-800 font-medium">Prompt Habit:</p>
          <div className="relative bg-[#F7F4ED] p-4 pr-12 rounded-lg border-card-border border">
            <CopyButton text="Before making a major change, duplicate the current version and label it. Small cost, big safety net." />
            <p className="text-sm text-gray-800">
              Before making a major change, duplicate the current version and label it. Small cost, big safety net.
            </p>
          </div>
        </div>
      </div>
  }]
}];

const PlaybookContent = () => {
  const [activeChapter, setActiveChapter] = useState("1");
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0.1
    };
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const chapterNumber = entry.target.id.replace('chapter-', '');
          setActiveChapter(chapterNumber);

          // Dispatch custom event to update sidebar
          window.dispatchEvent(new CustomEvent('activeChapterChange', {
            detail: {
              activeChapter: chapterNumber
            }
          }));
        }
      });
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all chapter elements
    contentData.forEach(phase => {
      phase.chapters.forEach(chapter => {
        const element = document.getElementById(`chapter-${chapter.number}`);
        if (element) {
          observer.observe(element);
        }
      });
    });
    return () => observer.disconnect();
  }, []);
  return <div className="max-w-3xl mx-auto py-16 px-8">
      {/* Hero Section */}
      <div className="mb-20">
        <p className="text-gray-500 mb-4 text-sm">
          ULTIMATE PROMPT GUIDE
        </p>
        <h1 className="text-gray-900 mb-6 leading-snug font-bold text-4xl">
          How to prompt better products with AI
        </h1>
        <p className="text-gray-600 leading-relaxed mb-8">
          Turn your ideas into high-quality UI faster. Use these prompt hacks to think clearer,
          move quicker, and build better with Lovable.
        </p>

        {/* Updated buttons below subheadline */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <a 
            href="https://lovable.dev" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-9 px-4 py-2 text-sm font-medium bg-gray-900 text-white hover:bg-gray-800 rounded-md transition-colors"
          >
            Try Lovable for free
          </a>
          <a 
            href="https://www.linkedin.com/in/felixhhaas/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-9 px-4 py-2 text-sm font-medium bg-white text-gray-900 border border-gray-300 hover:bg-gray-100 rounded-md transition-colors"
          >
            Follow for more
          </a>
        </div>

        {/* CTA Card moved inside hero section */}
        <div className="mb-8 -mx-8 md:mx-0">
          <div 
            className="relative overflow-hidden rounded-none md:rounded-2xl text-center py-32 px-8"
            style={{
              backgroundImage: `url('/lovable-uploads/014b7e2f-7c28-4f31-a02d-589d8ff6deaa.png')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <div className="relative z-10">
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      {contentData.map((phase, phaseIndex) => <div key={phaseIndex} className="mb-16">
          {/* Phase Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              {phase.phase}
            </h2>
          </div>

          {/* Chapters */}
          <div className="space-y-12">
            {phase.chapters.map((chapter, chapterIndex) => <div key={chapterIndex} id={`chapter-${chapter.number}`} className="py-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {chapter.number}. {chapter.title}
                </h3>
                <div className="text-gray-600 leading-relaxed">
                  {typeof chapter.content === 'string' ? <p>{chapter.content}</p> : chapter.content}
                </div>
              </div>)}
          </div>
        </div>)}
    </div>;
};

export default PlaybookContent;
