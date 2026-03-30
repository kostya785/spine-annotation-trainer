
Konstantinopol Spine Annotation Trainer
A minimalist, precision‑oriented training environment for annotating spinal X‑ray images. The project is designed to teach consistent, reproducible, and anatomically grounded labeling — a foundational step in building reliable medical AI systems.

Purpose
Accurate annotation is the backbone of every diagnostic model. A single misplaced polygon can distort a dataset, weaken a neural network, or shift a clinical decision. This trainer provides a controlled, distraction‑free environment where specialists can practice identifying vertebral bodies, understand anatomical transitions, and develop a unified annotation style.
The interface emphasizes clarity, focus, and anatomical correctness, reflecting the Konstantinopol design philosophy: warm minimalism, functional elegance, and respect for medical detail.

Philosophy
Every radiograph is a story the clinician reads anew. Artificial intelligence supports this process by offering an additional perspective where it is needed, not by replacing human expertise. Building a trustworthy neural assistant requires careful work from developers and medical professionals alike. Annotation and interpretation of medical images form the foundation on which model quality is built.
This trainer exists to cultivate the skill at the heart of every medical neural network: precise, consistent, and thoughtful labeling.

Key Features
Curated X‑ray Gallery
Frontal and sagittal projections
Cervical, thoracic, lumbar, and whole‑spine studies
Normal anatomy, scoliosis, spondylolisthesis
Multilingual titles, projections, and descriptions
Anatomical hint sets for each image
Annotation Tools
Polygon creation and editing
Adjustable brightness, contrast, and zoom
Clean, unobtrusive UI optimized for focus
Full RU/EN language support
Reference Comparison
Automatic matching of user polygons to reference shapes
Intelligent fallback matching when labels differ
Robust handling of incomplete or shifted vertebrae
Visual and numerical feedback
Evaluation Metrics
Three complementary metrics quantify annotation quality:
Base — point‑wise accuracy of polygon vertices
Dice coefficient — overlap between predicted and reference regions
Jaccard index — similarity of areas
Metrics are presented through:
a per‑vertebra table
a bar chart
a summary chart
an overall composite score

Anatomical Guidance
Each image includes a structured set of hints covering:
how to identify vertebral bodies
how to distinguish spinal regions
how to interpret natural curves
how to handle obscured or low‑contrast areas
how to avoid common annotation errors
how to adjust brightness and contrast effectively
Hints are available in both English and Russian.

Internationalization
All interface elements, gallery descriptions, and anatomical hints are fully translated into English and Russian. Language switching is instantaneous and affects the entire application.

Technology Overview
React + Vite
Context‑based state management
SVG‑based polygon annotation
Custom metric computation (Base, Dice, Jaccard)
GitHub Pages deployment
Fully client‑side, no backend required

Live Deployment
The application runs directly in the browser via GitHub Pages. No installation, configuration, or local environment is required.

Author
Konstantinopol
Design, development, anatomical logic, and system architecture.

