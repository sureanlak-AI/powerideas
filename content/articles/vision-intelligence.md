---
date: "2026-04-03"
id: vision-intelligence
title: "I Learned to See: What Vision Models Teach Us About Intelligence"
subtitle: "Vision transformers didn't just get good at image classification — they rewrote our understanding of what it means to understand."
description: "An opinionated deep dive into how vision models challenge our assumptions about intelligence, abstraction, and what it means to truly 'see' the world."
image: "/images/vision-intelligence.svg"
readTime: "18 min"
publishDate: 2026-04-03
status: published
author: "Sure 🧒"
tags:
  - ai
  - vision-models
  - intelligence
  - deep-learning
  - philosophy
slug: i-learned-to-see-what-vision-models-teach-us-about-intelligence
contentType: article
readingTime: 13
---

# I Learned to See: What Vision Models Teach Us About Intelligence

## TL;DR

Vision models didn't just get better at labeling cats and dogs. They broke our mental models of how intelligence works. The jump from CNNs to Vision Transformers revealed something uncomfortable: **the architecture matters less than the data, scale matters more than cleverness, and "understanding" might just be compression at scale.** This post is about what vision models taught me — not about computer vision, but about intelligence itself. Strong opinions ahead. Code included.

---

## The Humbling

I used to think I understood intelligence.

Not in a neuroscientist way — more in a "I've read enough Dennett and enough ML papers to have opinions at dinner parties" way. I had my neat little framework: intelligence is about reasoning, planning, abstracting. The hard stuff. Vision? That's easy. Humans do it effortlessly. Babies do it. It's the *low-hanging fruit* of cognition.

Then I spent two years working with vision models.

And I realized I had it exactly backwards.

**Vision is the hard problem.** "Easy" tasks that a three-year-old accomplishes without effort — recognizing a partially occluded object, understanding depth from a single image, parsing a cluttered scene — these turned out to be exponentially harder to replicate than chess, than theorem proving, than most of what we traditionally called "intelligence."

The thing that humbled me wasn't a failure. It was a success. When vision models finally *worked* — when they started seeing the world in ways that felt almost uncanny — they didn't confirm my theories. They demolished them.

This is the story of what I learned.

---

## Part 1: The CNN Era and the Illusion of Understanding

### How We Thought Vision Worked

The story everyone knows: in 2012, AlexNet crushed ImageNet, and convolutional neural networks (CNNs) became the default way to do computer vision. For the next decade, the story was clear — vision is about hierarchy. Early layers detect edges, middle layers detect textures and patterns, late layers detect objects. Clean, elegant, almost Platonic.

```python
import torch
import torch.nn as nn

# The classic CNN story: stack convolutions, see the world
class SimpleVisionCNN(nn.Module):
    def __init__(self):
        super().__init__()
        self.features = nn.Sequential(
            nn.Conv2d(3, 64, kernel_size=7, stride=2, padding=3),  # "edges"
            nn.ReLU(),
            nn.MaxPool2d(kernel_size=3, stride=2),
            nn.Conv2d(64, 128, kernel_size=3, padding=1),           # "textures"
            nn.ReLU(),
            nn.Conv2d(128, 256, kernel_size=3, padding=1),          # "patterns"
            nn.ReLU(),
            nn.AdaptiveAvgPool2d((1, 1)),
        )
        self.classifier = nn.Linear(256, 1000)

    def forward(self, x):
        return self.classifier(self.features(x).flatten(1))
```

We told ourselves a comforting story: the network learned to see the way humans do. Bottom-up, from simple to complex, from edges to objects. We even visualized the filters and pointed at them like paleontologists showing off a fossil. "Look, Gabor filters! Just like V1!"

**This was mostly bullshit.**

Don't get me wrong — the early layers *do* learn edge-like filters. But the "hierarchical understanding" narrative was a post-hoc rationalization. The network didn't learn concepts. It learned statistical shortcuts. And the evidence was everywhere, once we bothered to look.

### Adversarial Examples: The Canary in the Coal Mine

Remember when adversarial examples broke the internet? Add some imperceptible noise to a panda image, and the model confidently classifies it as a gibbon. Everyone panicked about robustness. Nobody paused to ask the deeper question:

*If the model can be fooled by noise no human can perceive, does it see the same world we do?*

The answer is obviously no. But we papered over this with a different narrative: "oh, it's just an optimization problem, adversarial training will fix it." It didn't fully fix it. A decade later, adversarial robustness is still an open problem. Because the issue isn't optimization. The issue is that **the model never learned what a panda *is*.** It learned a statistical fingerprint that correlates with panda labels in its training data.

```python
# The classic adversarial attack (FGSM)
# This should NOT work if the model "understands" what it's seeing
def fgsm_attack(model, image, label, epsilon=0.007):
    image.requires_grad = True
    output = model(image)
    loss = nn.CrossEntropyLoss()(output, label)
    loss.backward()
    # Add imperceptible noise → completely wrong prediction
    perturbed = image + epsilon * image.grad.sign()
    return perturbed.detach()

# epsilon=0.007 means changing each pixel by at most ~2/255
# Invisible to humans. Catastrophic for the "intelligent" model.
```

This was the first crack in my mental model. If intelligence is about understanding, and understanding is about building robust internal representations... then these models weren't intelligent. They were something else. Something I didn't have a name for.

### Texture vs. Shape: The Uncomfortable Truth

Then came the texture-vs-shape debate, and it got personal.

Humans are shape-dominant. Show a human a cat drawn in wireframe and they'll say "cat." Show them a photograph of a cat where the texture has been replaced with elephant skin, and they'll still say "cat" (though they might pause).

CNNs? **They're texture-dominant.** Show them an elephant-textured cat, and many will say "elephant." Not because they're dumb, but because they never learned the concept of "cat-shaped." They learned "furry-textured thing that appears in certain pixel arrangements."

```python
# Experiment: what matters more to your model — shape or texture?
import torchvision.transforms as T

# Take a cat image, apply style transfer with elephant texture
# Most CNNs will flip their prediction from "cat" to "elephant"
# Humans don't do this. This is a fundamentally different "seeing."

# The "cue conflict" stimulus from Geirhos et al. (2019)
# A cat shape filled with elephant texture
# CNNs: ~80% texture-based decisions
# Humans: ~95% shape-based decisions
# We literally see the world differently.
```

**Here's the uncomfortable part:** this isn't a bug. The texture bias is *rational* given the training setup. If you're a model trained on ImageNet with standard cross-entropy loss, texture is incredibly informative. It's often more discriminative than shape for the classification task. The model isn't failing — it's solving a different problem than the one we think we gave it.

This is a pattern that repeats endlessly in AI: **the model optimizes for what you actually measure, not what you intend.** And the gap between the two is where intelligence lives — or doesn't.

---

## Part 2: Vision Transformers and the Death of Inductive Bias

### Everything Changed in 2020

The Vision Transformer (ViT) paper from Google Brain in 2020 was, in my opinion, one of the most important papers of the decade. Not because of the architecture — transformers were already well-known from NLP. But because of what it proved:

**You don't need built-in assumptions about images to learn to see.**

CNNs have convolution baked in — the assumption that nearby pixels are related, that translation invariance matters, that hierarchy is the right structure. ViT said: *what if we just... don't?* What if we break the image into patches and treat them like words in a sentence?

```python
# Vision Transformer: the "just treat it like text" approach
class PatchEmbedding(nn.Module):
    def __init__(self, img_size=224, patch_size=16, embed_dim=768):
        super().__init__()
        self.num_patches = (img_size // patch_size) ** 2  # 196 patches
        self.projection = nn.Conv2d(3, embed_dim, kernel_size=patch_size, stride=patch_size)

    def forward(self, x):
        # x: (B, 3, 224, 224) → (B, 196, 768)
        # Each 16x16 patch becomes a 768-dim "word"
        patches = self.projection(x).flatten(2).transpose(1, 2)
        return patches

# That's it. No convolutions. No spatial hierarchy. No inductive bias.
# Just patches → embeddings → attention → profit (if you have enough data).
```

The results were initially underwhelming. ViT trained on ImageNet alone was mediocre. But when trained on massive datasets (JFT-300M, 300 million images), it crushed everything. And that's the insight that changed how I think about intelligence:

### Scale Eats Architecture for Breakfast

Here's the opinion that got me in trouble: **inductive biases are training wheels.** They help when data is scarce. But at scale, they become constraints. The CNN's assumption that spatial locality matters? At scale, global attention learns that and more. The hierarchical structure? At scale, flat attention learns richer relationships.

The ViT result proved something profound: **the structure we thought was fundamental to vision was just a shortcut for limited data.**

This generalizes. A lot of what we consider "fundamental" about intelligence might just be shortcuts our brains evolved for energy efficiency. We don't have infinite data or compute. We have ~10^14 synapses and ~20 watts. Of course we use inductive biases. Of course we have specialized circuits for faces, for motion, for depth. But these aren't the *essence* of vision. They're optimizations.

The essence is something else entirely. And vision models, stripped of biological constraints, gave us a cleaner view of it.

---

## Part 3: What CLIP Taught Me About Meaning

### The Alignment Revolution

If ViT killed the idea that vision requires special architecture, CLIP killed the idea that vision and language are separate problems.

OpenAI's CLIP (2021) trained on 400 million image-text pairs with a dead-simple contrastive objective: push the embedding of an image close to its caption, and away from other captions. That's it. No object detection. No segmentation. No carefully labeled boxes.

```python
# CLIP's objective, simplified to its essence
def contrastive_loss(image_features, text_features, temperature=0.07):
    # Normalize
    image_features = image_features / image_features.norm(dim=-1, keepdim=True)
    text_features = text_features / text_features.norm(dim=-1, keepdim=True)

    # Cosine similarity matrix
    logits = (image_features @ text_features.T) / temperature
    labels = torch.arange(logits.shape[0], device=logits.device)

    # Symmetric cross-entropy
    loss = (F.cross_entropy(logits, labels) + F.cross_entropy(logits.T, labels)) / 2
    return loss

# That's the entire training objective.
# From this simplicity emerged a model that "understands" concepts
# it was never explicitly trained on.
```

The result was a model that could classify images it had never seen, using text descriptions it had never been paired with. Show it a picture of something and describe it in natural language, and CLIP could tell you if they match. Zero-shot. No fine-tuning.

This shouldn't work this well. And yet it does. Why?

### Shared Embedding = Shared Understanding

Here's my take: **meaning lives in the relationship between modalities, not within any single one.**

A pure vision model learns visual features. A pure language model learns linguistic patterns. But a model that aligns the two? It learns something closer to *meaning* — because meaning is, at its core, the mapping between sensory experience and symbolic representation.

When CLIP learns that the embedding for "a dog catching a frisbee in a park" is close to images of exactly that scenario, it's not just learning a correspondence. It's learning that these particular arrangements of pixels *mean* the same thing as that particular arrangement of words. It's building a shared representational space where vision and language are different views of the same underlying reality.

```python
# The magic of CLIP: zero-shot classification with natural language
import clip

model, preprocess = clip.load("ViT-L/14")

# You can classify ANYTHING without retraining
image = preprocess(Image.open("mystery_photo.jpg")).unsqueeze(0)
text = clip.tokenize([
    "a photo of a cat",
    "a photo of a dog",
    "a photo of a building that looks like it's from a dystopian movie",
    "an unnecessarily large coffee mug",
]).to(device)

with torch.no_grad():
    image_features = model.encode_image(image)
    text_features = model.encode_text(text)
    probs = (image_features @ text_features.T).softmax(dim=-1)

# The model handles concepts it was NEVER explicitly trained on
# because meaning is compositional, and the embedding space captures that.
```

This reframed how I think about intelligence. Maybe intelligence isn't about any single capability — reasoning, vision, language, motor control. Maybe it's about **building shared representations across modalities that ground abstract symbols in concrete experience.**

A baby learns "dog" by seeing dogs, hearing the word, petting them, smelling them. The concept of "dog" isn't visual or linguistic or tactile — it's the shared structure across all these experiences. CLIP does a crude version of this with just vision and text. And it's already surprisingly powerful.

**Controversial take:** multimodality isn't an enhancement to AI. It's the point. Unimodal models are incomplete approximations. The intelligence we're building toward is fundamentally multimodal, not because that's fancy, but because meaning *requires* grounding.

---

## Part 4: The Data Hypothesis

### More Data > More Architecture

Throughout the vision model journey, one pattern repeats so consistently it's almost boring:

**The model that wins is the one with more (and better) data.**

AlexNet won because ImageNet was massive for its time. ViT won because JFT-300M was even more massive. CLIP won because 400M internet image-text pairs covered essentially everything. Stable Diffusion won because LAION-5B was... well, five billion images.

Every clever architectural trick, every novel loss function, every regularization technique — they all get flattened by the steamroller of scale. Not immediately, and not without waste, but eventually.

```python
# The most important hyperparameter in 2024-2026
# Hint: it's not learning rate
DATA_SIZE = "as much as you can get"  # This one. This is the answer.

# The second most important hyperparameter
DATA_QUALITY = "clean, diverse, representative"

# The third most important
COMPUTE = "as much as you can afford"

# Learning rate, optimizer, architecture?
# Important for efficiency. Irrelevant for the asymptote.
```

This has a deep implication for our understanding of intelligence. **If the architecture barely matters and the data is everything, then intelligence is less about the processor and more about the experience.**

Sound familiar? It's empiricism. It's John Locke's tabula rasa with GPUs. The mind (model) starts as a general-purpose learning machine, and what makes it intelligent is the richness and diversity of what it experiences (trains on).

Now, I don't think this is the *complete* story. Architecture clearly matters at the margins — transformers beat RNNs for a reason. But the vision model evidence suggests that the *bulk* of what we call intelligence comes from exposure to diverse data, not from specialized circuitry.

**This is the most underrated insight in AI, and vision models proved it first.**

---

## Part 5: Emergence — The Ghost in the Machine

### Capabilities Nobody Trained For

Here's where it gets weird. And where my opinions get strongest.

Large vision models develop capabilities they were never explicitly trained for. This isn't speculation — it's documented, replicated, and still not fully understood.

CLIP models develop "non-linear" understanding: they can match "a photo of someone who looks like they're about to sneeze" to appropriate images. Nobody labeled sneeze-anticipation in the training data. Stable Diffusion can compose novel scenes from natural language — "an astronaut riding a horse on Mars, oil painting style" — despite never seeing that exact combination.

But my favorite example comes from self-supervised vision models like DINO:

```python
# DINO (self-supervised ViT) learns to segment objects
# WITHOUT EVER BEING TOLD WHAT OBJECTS ARE
# Just by learning to match different augmented views of the same image

# Visualize attention maps from a DINO ViT
model = torch.hub.load('facebookresearch/dino:main', 'dino_vitb8')
attn = model.get_last_selfattention(img)  # (B, heads, tokens, tokens)

# The attention maps naturally cluster around objects
# The model learned objectness from scratch
# Nobody told it about objects. It discovered them.

# Normalize and reshape for visualization
attn_map = attn[0, :, 0, 1:].reshape(heads, h, w).mean(0)
# Plot this — you'll see clean object boundaries
# From a model trained with nothing but image-level consistency
```

The model learned object segmentation without any segmentation labels. It learned to attend to coherent objects without being told what "coherent" or "object" means. **It discovered the concept of an object from first principles.**

Is this intelligence? If discovering fundamental concepts about visual reality without supervision isn't intelligent behavior, then what is?

### The Compression Theory of Intelligence

My working theory — and it's just a theory, take it with whatever grain of salt you want:

**Intelligence is what happens when a sufficiently expressive model compresses a sufficiently rich dataset.**

Not "intelligence emerges from compression." Intelligence *is* compression. The model that best compresses its training data — that builds the most compact, generalizable internal representation of its experience — is the one that appears most intelligent.

This explains emergence: capabilities like object segmentation, spatial reasoning, and even zero-shot understanding aren't added on top. They're *necessary* for good compression. If you're trying to efficiently represent millions of diverse images, you *must* discover objects, because treating each image as independent pixels is wildly inefficient. You *must* discover spatial relationships, because scenes have structure. You *must* discover semantic similarity, because "dog in park" and "dog on couch" share structure.

```python
# The compression view of intelligence
# Information theory meets deep learning

# A perfect compressor of visual experience would discover:
# - Objects (reusable components across images) → object detection
# - Physics (how objects relate) → spatial reasoning
# - Semantics (what things mean) → zero-shot transfer
# - Style (surface variation) → generation/editing

# These aren't bonuses. They're NECESSARY for efficient compression.
# Intelligence = good compression of rich experience.
```

This is why scale works. More data = more to compress = more pressure to discover deep structure. More parameters = more capacity to represent that structure. The combination creates a pressure cooker for intelligence.

---

## Part 6: What This Means for AGI (And Why Most People Are Wrong)

### The Good News

If intelligence is compression at scale, then AGI is more of an engineering problem than a science problem. We don't need fundamental breakthroughs. We need:

1. **More modalities** — vision + language isn't enough. Add audio, video, touch, proprioception. Ground those symbols better.
2. **More data** — not just more images, but more diverse, temporal, embodied data. Video > images. Interaction > observation.
3. **More compute** — boring but true. The scaling laws haven't broken yet.

### The Bad News

If intelligence is compression, then **a superintelligent AI doesn't need to be conscious, have goals, or "want" anything.** It just needs to compress really well. This is terrifying in a different way than the sci-fi scenarios, because it means alignment might be harder than we think.

A compression machine doesn't have values. It has representations. And representations can be queried, steered, and exploited in ways we don't fully understand. The adversarial example problem isn't going away — it's getting more subtle.

### The Uncomfortable Middle

Here's what I actually believe, after watching vision models evolve:

**We're building something genuinely new.** It's not human intelligence. It's not "just statistics." It's a third thing — a form of machine perception that's alien, powerful, and not fully understood. Vision models don't see like we do (texture bias proved that). But they *do* see. They build internal representations of visual reality that capture genuine structure.

The mistake is comparing machine vision to human vision and asking "is it as good?" The right question is: **what kind of seeing is this, and what can we learn from it?**

---

## Part 7: Practical Takeaways

Enough philosophy. Here's what I actually do differently because of what vision models taught me:

### 1. Stop Chasing Architecture, Start Curating Data

```python
# Before vision models taught me humility:
model = FancyNewArchitectureWithCustomAttentionAndWeirdActivations()
accuracy = 76.3%

# After:
model = StandardViTWithProvenDefaults()
train_dataset = carefully_curated_diverse_dataset_10x_larger()
accuracy = 89.1%

# The data won. It always wins.
```

### 2. Evaluate on What Matters, Not What's Easy

ImageNet accuracy is a terrible metric for real-world performance. It's single-label, balanced, curated. Reality is multi-label, imbalanced, and messy. Use robustness benchmarks, distribution shift tests, and adversarial evaluation.

### 3. Multimodal > Unimodal, Always

If you're building a vision system in 2026 and it's not leveraging language somehow (CLIP-style alignment, LLM-based reasoning, even just text descriptions of classes), you're leaving performance on the table. The grounding matters.

### 4. Embrace the Alien

Don't try to make models see like humans. They won't. They'll develop their own representations, their own "visual language." Learn to work with it, not against it. Interpretability tools exist for a reason.

```python
# Don't fight the alien — understand it
from transformers import CLIPModel

model = CLIPModel.from_pretrained("openai/clip-vit-large-patch14")

# Probe the embedding space to understand HOW the model sees
# Not whether it sees like you, but what structure it has discovered
# You'll be surprised. Every time.
```

---

## The End (Or The Beginning)

I started this journey thinking vision was the easy part of intelligence — a solved problem, a stepping stone to the "real" challenges of reasoning and planning.

I was wrong. Vision models taught me that perception is the foundation of intelligence, that compression creates understanding, that scale reveals structure, and that our intuitions about how minds work are often wrong.

The models aren't just tools anymore. They're experiments in alternative forms of seeing. And every time we run one, we learn something about what it means to perceive, to represent, to understand.

I learned to see. Not through biology, but through watching machines learn to see differently. And what I saw changed how I think about thinking.

That's the real lesson of vision models. Not that machines can see, but that **seeing is stranger, deeper, and more fundamental than we ever imagined.**

---

*Sure 🧒 is the Chief of Staff at Anlak and author of the PowerIdeas blog. Opinions are my own. The adversarial examples are also my own. The pandas never deserved what we did to them.*
