export class MediaItem {
    constructor(
        public title: string,
        public speaker: string,
        public speakerIntro: string,
        public abstract: string,
        public videoId: string,
        public imageUrls: string[],
        public date: Date
    ) { }
}

const mediaItems = [
    new MediaItem(
        "Set Learning for Accurate and Calibrated Models",
        "Thomas Unterthiner (Google DeepMind)",
        "Thomas Unterthiner is a senior research engineer at Google DeepMind. He obtained his PhD in computer science at the Johannes Kepler University Linz, where he worked on several topics in computer vision and bioinformatics.",
        "This presentation focuses on a novel approach called OKO (odd-k-out learning), which aims to enhance the accuracy and calibration of machine learning models. OKO is a user-friendly method that improves model performance by modifying how data points are sampled during training and adjusting the computation of cross-entropy. This principled set learning approach is designed to help machine learning models provide predictions that are not only accurate but also well-balanced and reliable. The talk delves into the technical aspects of OKO and demonstrate its practical applications in improving model calibration and accuracy.",
        "pR1Zi6Klv44",
        [
            "/images/media/ss24/20240416_unterthiner/20240416_unterthiner1 Large.jpeg",
            "/images/media/ss24/20240416_unterthiner/20240416_unterthiner2 Large.jpeg",
            "/images/media/ss24/20240416_unterthiner/20240416_unterthiner3 Large.jpeg",

        ],
        new Date("2024-04-16")
    ),
    new MediaItem(
        "MatterGen: A Generative Model for Inorganic Materials Design",
        "Daniel Zügner (Microsoft AI4Science)",
        "Daniel Zügner is a senior research scientist at Microsoft AI4Science. Previously, he obtained his PhD in computer science at the Technical University of Munich, where he focused on deep learning for graphs and robustness of deep learning.",
        "The proposed diffusion graph neural network leverages typical properties of materials to efficiently and reliably suggest new stable compounds. Additionally, the model uses masked diffusion to generate atom types, further enhancing its predictive capabilities. The approach also supports conditional generation, allowing for the creation of materials with specific properties, such as band gap or bulk modulus. The results are compared against those obtained from density functional theory (DFT)-based workflows, demonstrating the model's effectiveness.",
        "gmcXvck692k",
        [
        ],
        new Date("2024-04-30")
    ),
    new MediaItem(
        "Towards Open Language Models for Europe",
        "Malte Ostendorff (DFKI)",
        "Malte Ostendorff is researcher at the German Research Center for Artificial Intelligence (DFKI) and did his PhD in the Scientific Information Analytics group at the University of Göttingen, supervised by Prof. Bela Gipp.",
        "“Towards Open Language Models for Europe,” outlines the technical, legal, and organizational challenges of building open, multilingual large language models in academia, emphasizing the need for European data sovereignty and community-driven efforts like the Occiglot project. He advocates for open-source development, efficient training methods, and collaborative contributions to advance LLMs tailored to European languages.",
        "iXtMgk9nfxI",
        [
            "/images/media/ss24/20240514_ostendorff/ostendorff_1 Large.jpeg",
            "/images/media/ss24/20240514_ostendorff/ostendorff_2 Large.jpeg",
            "/images/media/ss24/20240514_ostendorff/ostendorff_3 Large.jpeg",
            "/images/media/ss24/20240514_ostendorff/ostendorff_5 Large.jpeg",
            "/images/media/ss24/20240514_ostendorff/ostendorff_6 Large.jpeg",
            "/images/media/ss24/20240514_ostendorff/ostendorff_7 Large.jpeg",
        ],
        new Date("2024-05-14")
    ),
    new MediaItem(
        "Natural language representations in brains and machines",
        "Prof. Fatma Deniz (TU Berlin)",
        "Fatma Deniz, Vice President of the TU Berlin as well as Chair of the Language and Communication in Biological and Artificial Systems Lab.",
        "Fatma's talk deals with Natural language representations in brains and machines.",
        "",
        [
            "/images/media/ss24/20240528_deniz/deniz_1 Large.jpeg",
            "/images/media/ss24/20240528_deniz/deniz_2 Large.jpeg",
            "/images/media/ss24/20240528_deniz/deniz_3 Large.jpeg",
            "/images/media/ss24/20240528_deniz/deniz_4 Large.jpeg",
        ],
        new Date("2024-05-28")
    ),
    new MediaItem(
        "The Science of Decision-Making",
        "Prof. Sanaz Mostaghim (Otto von Guericke University of Magdeburg)",
        "Prof. Sanaz Mostaghim is a full professor of Computer Science at the Otto von Guericke University of Magdeburg and Institute Director at Fraunhofer IVI. She is also a member of the Saxon Academy of Sciences. She holds a PhD in Electrical Engineering and Computer Science from the University of Paderborn (2004), where she focused on bio-inspired optimization methods. She held a postdoctoral position at ETH Zurich and completed her habilitation at Karlsruhe Institute of Technology (KIT) in 2012. In 2014, she was awarded the prestigious DFG Heisenberg professorship at KIT. Prof. Mostaghim has held visiting positions at Swinburne University (2010) and Yale University (2013). She is an active member of IEEE Computational Intelligence Society, having served as vice president (2021–2024) and in editorial roles for IEEE journals. Her research spans evolutionary optimization, AI, and self-organized systems.",
        "Decision-making is a fundamental aspect of intelligent systems, from autonomous robots to complex optimization problems in science and engineering. This talk provides an overview of research on computational decision-making, focusing on bio-inspired optimization, multi-objective evolutionary algorithms, and AI-driven strategies. It explores how these methods enhance decision processes in dynamic and uncertain environments, with applications ranging from robotics to transportation and infrastructure. The talk highlights the role of AI in developing efficient, adaptive, and explainable decision-making systems.",
        "",
        [
            "/images/media/ws2425/20250204_mostaghim/Mostaghim_1 Large.jpeg",
            "/images/media/ws2425/20250204_mostaghim/Mostaghim_2 Large.jpeg",
            "/images/media/ws2425/20250204_mostaghim/Mostaghim_3 Large.jpeg"
        ],
        new Date("2025-02-04")
    ),
    new MediaItem(
        "Learning Physical Laws from Data",
        "Prof. Sven Wang (HU Berlin)",
        "Prof. Sven Wang is an assistant professor for Mathematical Statistics and Stochastics at the Humboldt University of Berlin. He previously studied mathematics at LMU Munich and Cambridge University and holds a PhD in Mathematical Statistics from Cambridge University. Before he started his position as an assistant professor here in Berlin, he spent two years as a Postdoc at the Massachusetts Institute of Technology (MIT).",
        "Many data collection processes in natural scientific settings are described by partial differential equations (PDEs) and stochastic differential equations (SDEs). In these settings, key statistical tasks such as the estimation of unknown high-dimensional parameters, prediction and uncertainty quantification have given rise to sophisticated frequentist and Bayesian statistical methodology. Recently, 'Scientific Machine Learning' has also played a big role in inferring complex relationships from data. In this talk, we discuss recent mathematical results in this broad context. In particular, we discuss dimension-free statistical convergence results for regression of 'operators' with neural networks, and we discuss the computational complexity of sampling from high-dimensional posterior distributions. If time permits, we will also discuss some mathematical foundations for PDE and SDE-based generative AI models.",
        "qLb2JKhtswU",
        [
            "/images/media/ws2425/20250121_wang/Wang_1 Large.jpeg",
            "/images/media/ws2425/20250121_wang/Wang_2 Large.jpeg",
            "/images/media/ws2425/20250121_wang/Wang_3 Large.jpeg"
        ],
        new Date("2025-01-21")
    ),
    new MediaItem(
        "Making AI fit for the Life Sciences",
        "Prof. Katharina Baum (FU Berlin)",
        "Prof. Katharina Baum is an Assistant professor for Data Integration in the Life Sciences at the Free University Berlin’s Institute of Computer Sciences. With a strong background in theoretical biophysics and data science, she has held research positions at renowned institutions, including the Hasso Plattner Institute, Mount Sinai’s Icahn School of Medicine, and the Max Delbrück Center for Molecular Medicine. Her expertise lies at the intersection of mathematics, computer science, and biomedical research, focusing on integrating and analyzing complex biological data. Prof. Baum holds a PhD in Theoretical Biophysics from Humboldt University Berlin and has studied Mathematics at Humboldt University and École Polytechnique in France.",
        "The integration of artificial intelligence and machine learning methods in the life sciences has enabled new insights into complex biological systems. However, the reliability and interpretability of machine learning (ML) models remain critical challenges. This talk explores strategies for informing ML models with domain-specific knowledge to enhance their accuracy and robustness. Additionally, it addresses the importance of quantifying and explaining uncertainty in data-driven analyses to ensure transparency and trust in biomedical applications. ",
        "J_SI67Muq3w",
        [
            "/images/media/ws2425/20250107_baum/Baum_1 Large.jpeg",
            "/images/media/ws2425/20250107_baum/Baum_2 Large.jpeg",
            "/images/media/ws2425/20250107_baum/Baum_3 Large.jpeg"
        ],
        new Date("2025-01-07")
    ),
    new MediaItem(
        "Combining Reinforcement Learning and Generative Models for de novo Drug Design",
        "Nima Siboni and Miguel Andres (InstaDeep)",
        "Nima Siboni and Miguel Arbesú Andrés are Senior (Applied) Research Engineers at InstaDeep. They did their PhDs at RWTH Aachen University resp. University of Barcelona.",
        "This talk explores how generative models can create novel molecular structures while RL fine-tunes these candidates toward desired biological and chemical properties. By incorporating domain-specific constraints and feedback mechanisms, this approach has the potential to accelerate drug discovery, optimizing for both efficacy and synthesizability.",
        "",
        [
            "/images/media/ws2425/20241217_instadeep/instadeep_1 Large.jpeg",
            "/images/media/ws2425/20241217_instadeep/instadeep_2 Large.jpeg",
            "/images/media/ws2425/20241217_instadeep/instadeep_3 Large.jpeg",
            "/images/media/ws2425/20241217_instadeep/instadeep_4 Large.jpeg",
        ],
        new Date("2024-12-17")
    ),
    new MediaItem(
        "Sequential and Active Decision Making: Bandit Theory",
        "Prof. Alexandra Carpentier (University of Potsdam)",
        "Prof. Alexandra Carpentier is a professor of Mathematical Statistics and Machine Learning at the University of Potsdam. She holds a PhD in Mathematical Statistics from INRIA, was a Postdoctoral Researcher at the University of Cambridge and has previously been on faculty at the University of Magdeburg and Université Paris-Nanterre. Her research focuses on sequential decision-making, bandit algorithms, and high-dimensional statistical inference, with applications in machine learning, anomaly detection, and neuroscience. She is the recipient of the prestigious Von Kaven Prize (2020) and serves as an associate editor for several top journals, including the Annals of Statistics and SIAM UQ.",
        "This talk introduces Bandit Theory, a framework for sequential, adaptive learning in uncertain environments with partial information. Inspired by the classic multi-armed bandit problem, where a decision-maker balances exploration and exploitation, this approach extends to settings where actions actively influence the data received. Unlike traditional batch learning, the learner gathers data incrementally, adapting strategies based on observations.",
        "",
        [
            "/images/media/ws2425/20241203_carpentier/carpentier_1 Large.jpeg",
            "/images/media/ws2425/20241203_carpentier/carpentier_2 Large.jpeg",
            "/images/media/ws2425/20241203_carpentier/carpentier_3 Large.jpeg",
        ],
        new Date("2024-12-03")
    ),
    new MediaItem(
        "Planning in the Age of Learning",
        "Prof. Marc Toussaint (TU Berlin)",
        "Prof. Marc Toussaint is a full professor at the Technical University of Berlin, where he leads the Learning and Intelligent Systems Lab. His research focuses on machine learning, robotics, and intelligent decision-making. Previously, he was a full professor at the University of Stuttgart, a Max Planck Fellow at the MPI for Intelligent Systems, and led the ML-Robotics lab at Amazon Berlin. Before that, he has held research positions at MIT, Free University of Berlin and the University of Edinburgh. After studies in theoretical physics and neuroinformatics, he obtained his PhD in Adaptive Systems from Ruhr University Bochum.",
        "Marc's talk explores how combining traditional model-based planning with modern neural network approaches enables robots to navigate and manipulate complex, unstructured environments. He demonstrates that integrating deep visual constraints and generative models with classical planning techniques can create more adaptable and robust decision-making strategies in robotics.",
        "hECYh6Pov-s",
        [
            "/images/media/ws2425/20241119_toussaint/toussaint_1 Large.jpeg",
            "/images/media/ws2425/20241119_toussaint/toussaint_2 Large.jpeg",
            "/images/media/ws2425/20241119_toussaint/toussaint_3 Large.jpeg",
        ],
        new Date("2024-11-19")
    ),
    new MediaItem(
        "The AI Scientist: Towards Fully Automated Open-Ended Scientific Discovery",
        "Robert Lange (Sakana.AI)",
        "Robert Lange is a Research Scientist at Sakana.AI and a PhD student at TU Berlin, working on Evolutionary Meta-Learning. He gained Professional Experiences at Google DeepMind, Science of Intelligence and other research institutions before joining Sakana.AI",
        "Robert's talk, “The AI Scientist,” outlines an innovative pipeline where generative AI automates the research process—from formulating ideas and designing experiments to drafting manuscripts. By integrating iterative code implementation, automated reviewing, and ethical safeguards, the presentation demonstrates how AI can accelerate scientific discovery while keeping human insight in the loop.",
        "dRDemw05XQM",
        [
            "/images/media/ws2425/20241105_lange/lange_1 Large.jpeg",
            "/images/media/ws2425/20241105_lange/lange_2 Large.jpeg",
            "/images/media/ws2425/20241105_lange/lange_3 Large.jpeg",
            "/images/media/ws2425/20241105_lange/lange_4 Large.jpeg",
        ],
        new Date("2024-11-05")
    ),
    new MediaItem(
        "The Role of AI in Disinformation Resilience",
        "Veronika Solopova (TU Berlin)",
        "Veronika Solopova is a PostDoc at TU Berlin and NLP Engineer at Mantis Analytics. Her work is centered around analyses regarding social media and detecting hate speech, propaganda and detecting shitstorms.",
        "Veronika's talk examines how AI can fortify disinformation resilience by creating transparent, accurate, and adaptable systems for detecting propaganda across diverse languages and media formats. By leveraging sophisticated linguistic features, statistical models, and real-world user feedback, she illustrates a comprehensive approach that empowers journalists, fact-checkers, and policymakers to effectively counter misinformation.",
        "IEeL9HbzAm8",
        [
            "/images/media/ws2425/20241022_solopova/solopova_1 Large.jpeg",
            "/images/media/ws2425/20241022_solopova/solopova_2 Large.jpeg",
            "/images/media/ws2425/20241022_solopova/solopova_3 Large.jpeg",
        ],
        new Date("2024-10-22")
    ),
    new MediaItem(
        "Learning molecular models",
        "Prof. Cecilia Clementi (FU Berlin)",
        "Prof. Cecilia Clementi is an Einstein professor at the FU Berlin Theoretical and Computational Biophysics Lab",
        "Prof. Clementi delves into the exciting intersection of machine learning, experimental science, and molecular modeling. This session offers a comprehensive look at how cutting-edge machine learning techniques can be combined with experimental data to enhance our understanding of molecular dynamics.",
        "IjICh0Vh8vk",
        [
            "/images/media/ss24/20240709_clementi/clementi_1 Large.jpeg",
            "/images/media/ss24/20240709_clementi/clementi_2 Large.jpeg",
            "/images/media/ss24/20240709_clementi/clementi_3 Large.jpeg",
        ],
        new Date("2024-07-09")
    ),
    new MediaItem(
        "Intelligent Flying Multi-Robot Systems",
        "Prof. Wolfgang Hoenig (TU Berlin)",
        "Prof. Wolfgang Hönig is an assistant professor at TU Berlin, leading the Intelligent Multi-Robot Coordination Lab. The focus is on developing methods for large teams of robots to collaborate on real-world tasks, utilizing informed search, optimization, and machine learning techniques.",
        "Prof. Hönig's presentation explores cutting‐edge techniques for enabling intelligent flying multi-robot systems, where advanced machine learning models integrate seamlessly with motion planning and control to enhance safety and coordination. By leveraging neural interaction models and conflict-based search algorithms, the talk demonstrates how AI can effectively address the complex challenges of autonomous aerial teamwork.",
        "hMjQWJC6Ed8",
        [
            "/images/media/ss24/20240611_hoenig/hoenig_1 Large.jpeg",
            "/images/media/ss24/20240611_hoenig/hoenig_2 Large.jpeg",
            "/images/media/ss24/20240611_hoenig/hoenig_3 Large.jpeg",
            "/images/media/ss24/20240611_hoenig/hoenig_4 Large.jpeg",
        ],
        new Date("2024-06-11")
    ),
    // SS2025
    new MediaItem(
        "Can Compressing Foundation Models be as Easy as Image Compression?",
        "Dr. Martin Genzel (Merantix Momentum)",
        "Dr. Martin Genzel is a Senior Research Engineer at Merantix Momentum.",
        "The widespread adoption of Foundation Models, especially LLMs, is often hindered by their substantial size and computational demands, especially in resource-limited settings. While post-training compression offers a promising avenue to mitigate these challenges, the process can feel like a \"black box\" for the user, requiring significant expertise and trial-and-error to find the right balance between model size and performance. This talk introduces Any Compression via Iterative Pruning (ACIP), a novel algorithmic approach designed with the user in mind. ACIP allows for intuitive and direct control over the compression-performance trade-off, akin to compressing an image. It leverages a single gradient descent run of iterative pruning to establish a global parameter ranking, from which models of any target size can be immediately materialized. ACIP demonstrates strong predictive performance on downstream tasks without costly fine-tuning. Across various open-weight LLMs, it achieves state-of-the-art compression results compared to existing factorization-based methods. Moreover, it seamlessly complements common quantization techniques for even greater compression.",
        "xP1q9puc5hk",
        [
            "/images/media/ss25/20250422_genzel/DSCF9904.jpeg",
            "/images/media/ss25/20250422_genzel/DSCF9911.jpeg",
            "/images/media/ss25/20250422_genzel/DSCF9913.jpeg",
        ],
        new Date("2025-04-22")
    ),
    new MediaItem(
        "CAPI: Cluster & Predict Patches for Improved Image Modeling",
        "Timothée Darcet (Meta AI, Inria)",
        "Timothée Darcet is a PhD student at Meta AI and Inria.",
        "Masked Image Modeling (MIM) offers a promising approach to self-supervised representation learning, however existing MIM models still lag behind the state-of-the-art. In this talk, we systematically analyze target representations, loss functions, and architectures, to present CAPI - a novel pure-MIM framework that relies on the prediction of latent clusterings. Our approach leverages a clustering-based loss, which is stable to train, and exhibits promising scaling properties. Our ViT-L backbone, CAPI, achieves 83.8% accuracy on ImageNet and 32.1% mIoU on ADE20K with simple linear probes, substantially outperforming previous MIM methods and approaching the performance of the current state-of-the-art, DINOv2.",
        "s8fH9Xbau7o",
        [
            "/images/media/ss25/20250506_darcet/DSCF9943.jpeg",
            "/images/media/ss25/20250506_darcet/IMG_8487.jpeg",
            "/images/media/ss25/20250506_darcet/IMG_8489.jpeg",
            "/images/media/ss25/20250506_darcet/IMG_8504.jpeg",
        ],
        new Date("2025-05-06")
    ),
    new MediaItem(
        "Scalable Emulation of Protein Equilibrium Ensembles with Generative Deep Learning",
        "Dr. Yu Xie and Dr. Michael Gastegger (Microsoft AI4Science)",
        "Dr. Yu Xie and Dr. Michael Gastegger are both Senior Researchers at Microsoft AI4Science.",
        "Following the sequence and structure revolutions, predicting the dynamical mechanisms of proteins that implement biological function remains an outstanding scientific challenge. Several experimental techniques and molecular dynamics (MD) simulations can, in principle, determine conformational states, binding configurations and their probabilities, but suffer from low throughput. Here we develop a Biomolecular Emulator (BioEmu), a generative deep learning system that can generate thousands of statistically independent samples from the protein structure ensemble per hour on a single graphical processing unit. By leveraging novel training methods and vast data of protein structures, over 200 milliseconds of MD simulation, and experimental protein stabilities, BioEmu’s protein ensembles represent equilibrium in a range of challenging and practically relevant metrics. Qualitatively, BioEmu samples many functionally relevant conformational changes, ranging from formation of cryptic pockets, over unfolding of specific protein regions, to large-scale domain rearrangements. Quantitatively, BioEmu samples protein conformations with relative free energy errors around 1 kcal/mol, as validated against millisecond-timescale MD simulation and experimentally-measured protein stabilities. By simultaneously emulating structural ensembles and thermodynamic properties, BioEmu reveals mechanistic insights, such as the causes for fold destabilization of mutants, and can efficiently provide experimentally-testable hypotheses.",
        "UvWHCsjjEBY",
        [
            "/images/media/ss25/20250520_xie_gastegger/ai4s_1.jpeg",
            "/images/media/ss25/20250520_xie_gastegger/ai4s_2.jpeg",
            "/images/media/ss25/20250520_xie_gastegger/ai4s_3.jpeg",
            "/images/media/ss25/20250520_xie_gastegger/ai4s_4.jpeg",
            "/images/media/ss25/20250520_xie_gastegger/ai4s_5.jpeg",
            "/images/media/ss25/20250520_xie_gastegger/ai4s_6.jpeg",
        ],
        new Date("2025-05-20")
    ),
    new MediaItem(
        "Watermark Anything with Localized Messages",
        "Dr. Pierre Fernandez (FAIR Meta AI)",
        "Dr. Pierre Fernandez is a Research Scientist at Meta AI",
        "Invisible image watermarking embeds information into image pixels in a way that remains imperceptible to the human eye but can still be retrieved even after significant image editing. However, traditional methods struggle when dealing with small, localized watermarked areas—something that often happens in real-world scenarios where images come from different sources or undergo modifications. In this talk, after a brief introduction to image watermarking, we’ll explore an approach designed to tackle this issue. Watermark Anything (ICLR 2025) reframes image watermarking as a segmentation problem. We’ll walk through the motivation behind this idea, how we developed and trained the model, the challenges we faced, and the final results.",
        "gwnYmoVzJCo",
        [
            "/images/media/ss25/20250603_fernandez/fernandez_1.jpeg",
            "/images/media/ss25/20250603_fernandez/fernandez_2.jpeg",
            "/images/media/ss25/20250603_fernandez/fernandez_3.jpeg",
        ],
        new Date("2025-06-03")
    ),
    new MediaItem(
        "Radiance Fields are Dead (and why that's OK)",
        "Daniel Duckworth (Google DeepMind)",
        "Daniel Duckworth is a Senior Research Software Engineer at Google DeepMind",
        "Our innate ability to reconstruct the 3D world around us from our eyes alone is a fundamental part of human perception. For computers, however, this task remained a significant challenge — until the advent of Neural Radiance Fields (NeRFs). Upon their introduction, NeRFs marked a paradigm shift in the field of novel view synthesis, demonstrating huge improvements in visual realism and geometric accuracy over prior works. The subsequent proliferation of NeRF variants has only expanded their capabilities, unlocking larger scenes, achieving even higher visual fidelity, and accelerating both training and inference. Nevertheless, NeRF is no longer the tool of choice for 3D reconstruction. Why? Join a researcher from the front lines as we explore NeRF’s foundations, dissect its strengths and weaknesses, see how the field has evolved, and explore the future of novel view synthesis.",
        "FtaC5lh8hxs",
        [
            "/images/media/ss25/20250617_duckworth/1.jpg",
            "/images/media/ss25/20250617_duckworth/2.jpg",
            "/images/media/ss25/20250617_duckworth/3.jpg",
        ],
        new Date("2025-06-17")
    ),
    new MediaItem(
        "Progress in AI Safety and Security",
        "Dr. Adel Bibi (University of Oxford)",
        "Adel Bibi is a senior researcher in machine learning and computer vision at the Department of Engineering Science since 2023, University of Oxford, a Research Member of the Common Room at Kellogg College, and a member of the ELLIS Society. Bibi is an R&D Distinguished Advisor with Softserve.",
        "We will navigate through the alignment challenges and safety considerations of LLMs, addressing both their limitations and capabilities, particularly focusing on techniques related to instruction prefix tuning and their theoretical limitations toward alignment. Additionally, I will discuss fairness across languages in common tokenizers used in LLMs. Finally, I will address safety considerations for agentic systems, illustrating methods to compromise their safety by exploiting seemingly minor changes, such as altering the desktop background to generate a chain of sequenced harmful actions. I will also explore the transferability of these vulnerabilities across different agents.",
        "pyTLoOqtA0k",
        [
            "/images/media/ss25/20250701_bibi/1.jpg",
            "/images/media/ss25/20250701_bibi/2.jpg",
            "/images/media/ss25/20250701_bibi/3.jpg",
        ],
        new Date("2025-07-01")
    ),
    new MediaItem(
        "Detecting Hallucinations in Large Language Models Using Semantic Entropy",
        "Jannik Kossen (Meta FAIR)",
        "Jannik is an AI research scientist at Meta FAIR, building LLMs for code generation. He worked at the University of Oxford on uncertainty and data-efficiency in vision and language models, which will culminate in the awarding of his PhD. He previously studied Physics in Bremen and Heidelberg, has interned at Google and DeepMind, and now lives in Berlin.",
        "Large language models can 'hallucinate' factually incorrect outputs, presenting significant risks for their adoption to high-stakes applications. Jannik will present joint work recently published in Nature (https://www.nature.com/articles/s41586-024-07421-0) on detecting hallucinations in large language models using semantic entropy, which mitigates hallucinations by quantifying the model's own uncertainty over the meaning of generations. He will also discuss a recent pre-print (https://arxiv.org/abs/2406.15927) that proposes a method to drastically reduce the cost of uncertainty quantification in LLMs by predicting semantic entropy from latent space, and he may ramble about uncertainties in LLMs more generally.",
        "eiL6egIX4ms",
        [
            "/images/media/ss25/20250715_kossen/1.jpg",
            "/images/media/ss25/20250715_kossen/2.jpg",
            "/images/media/ss25/20250715_kossen/3.jpg",
            "/images/media/ss25/20250715_kossen/4.jpg",
        ],
        new Date("2025-07-15")
    ),
    // WS2526
    new MediaItem(
        "Why do LLMs struggle with Long Context?",
        "Federico Barbero (Google DeepMind, University of Oxford)",
        "Federico Barbero is a researcher at Google DeepMind and the University of Oxford, focusing on the challenges and limitations of large language models, particularly in handling long-context scenarios.",
        "This talk explores the fundamental challenges that large language models face when processing long contexts. Federico will discuss the technical limitations, architectural constraints, and potential solutions for improving LLMs' ability to effectively handle extended input sequences.",
        "Dsl2bD6akkM",
        [
            "/images/media/ws2526/20251021_barbero/barbero_1.jpeg",
            "/images/media/ws2526/20251021_barbero/barbero_2.jpeg",
            "/images/media/ws2526/20251021_barbero/barbero_3.jpeg",
            "/images/media/ws2526/20251021_barbero/barbero_4.jpeg",
        ],
        new Date("2025-10-21")
    ),
    new MediaItem(
        "Scaling AI Safety Across Cultures and Languages",
        "Beyza Ermiş (Cohere)",
        "Beyza is a Senior Research Scientist at Cohere in Berlin, working on large-scale machine learning with a focus on language models. Prior to this, she was a Research Scientist at Amazon Web Services (2017-2022) and held research assistant and intern positions at Boğaziçi University and Amazon, where she worked on applied machine learning problems. She completed her PhD and MSc in Computer Science at Boğaziçi University, following a BSc in Computer Engineering at Bilkent University.",
        "Modern AI systems are deployed globally, across cultures and in hundreds of languages, yet most safety research and evaluation remains English-centric. In this talk, we will outline a pragmatic roadmap for scaling safety beyond a single linguistic or cultural frame. We will first outline AI safety as a full-stack technical discipline spanning robustness, alignment, privacy, misuse resistance, and critically, evaluation. We will then argue that harm is not universal: what counts as harmful varies with local norms and histories. Drawing on evidence from multilingual red-teaming and jailbreak studies, we will show higher failure rates in low-resource languages and the limits of translate-and-test approaches. We will introduce a global-vs-local harm lens, address data scarcity and long-tail challenges, and present actionable mitigations. Finally, we will examine fairness in model evaluation and close with concrete recommendations for building culturally aware benchmarks and auditing multilingual safety so models are not only capable, but reliably aligned with the communities they serve.",
        "ECS0Rez1AeA",
        [
            "/images/media/ws2526/20251104_ermis/ermis_1.jpeg",
            "/images/media/ws2526/20251104_ermis/ermis_2.jpeg",
            "/images/media/ws2526/20251104_ermis/ermis_3.jpeg",
        ],
        new Date("2025-11-04")
    ),
    new MediaItem(
        "Generative World Models",
        "Ashley Edwards (Google DeepMind)",
        "Ashley is a Senior Research Scientist at Google DeepMind, where she works on reinforcement learning and foundational world models. She received her PhD in Computer Science from Georgia Tech in 2019, where she developed models for inferring latent actions, rewards, and policies from videos. Previously, she was a Research Scientist at Uber AI Labs and an intern at Google Brain. She holds a BSc in Computer Science from the University of Georgia.",
        "Training models on large-scale data has given us powerful generative capabilities for text, images, and video. However, this success has not yet extended to training generalist embodied agents. This talk tackles this gap by focusing on a potential solution to this problem: scalable world models. We'll trace the idea of planning in predictive models, from its origins to modern efforts on building world models directly from pixels. I'll discuss the primary challenge of scaling these models and present our work, Genie, which enables us to learn world models without explicit action labels at scale, demonstrating a new path forward for training the generalist agents of the future.",
        "e6echhvqxhM",
        [
            "/images/media/ws2526/20251118_edwards/edwards_1.jpeg",
            "/images/media/ws2526/20251118_edwards/edwards_2.jpeg",
            "/images/media/ws2526/20251118_edwards/edwards_3.jpeg",
            "/images/media/ws2526/20251118_edwards/edwards_4.jpeg",
        ],
        new Date("2025-11-18")
    ),
    new MediaItem(
        "What's Next in Continual Learning for Foundation Models?",
        "Ameya Prabhu (Tübingen AI Center)",
        "Ameya is a Postdoctoral Researcher at the Bethge Lab, Tübingen AI Center, where he works on developing frontier benchmarks for foundation models with a broader focus on automated scientific discovery. He received his PhD in Artificial Intelligence from the University of Oxford in 2024, working on continual learning and robustness, including contributions such as GDumb and RanDumb. He previously held research roles at Intel Labs, Verisk, IBM, and WizCal, spanning topics from large-scale continual learning to neural architecture search and uncertainty estimation. Before Oxford, he completed a dual Bachelor’s and Master’s by Research in Computer Science at IIIT Hyderabad. His work has been published at NeurIPS, ICML, ICCV, EMNLP, and TMLR.",
        "This talk discusses the latest advancements in continual learning for foundation models.",
        "2Bfvmi4ySBs",
        [],
        new Date("2025-12-02")
    ),
    new MediaItem(
        "Insights into Training Video Models",
        "Dilara Gökay (Google DeepMind)",
        "Dilara is a Research Engineer at Google DeepMind in London, working on video understanding. She received her MSc in Computer Science from the Technical University of Munich in 2022, specializing in computer vision and graphics as a TEV/DAAD scholar, and her BSc in Computer Engineering from Boğaziçi University, where she graduated with high honors. Previously, she held engineering roles at Facebook Reality Labs, Microsoft, and X (The Everyday Robot Project), as well as a site reliability internship at Google.",
        "Real-world understanding necessitates modeling complex temporal and motion cues, yet current image-first approaches often fall short in capturing \"what is happening\" in favor of \"what\" is merely present. Furthermore, convincingly demonstrating scaling for pure self-supervised learning from video has remained a challenge, largely because prior evaluation has focused on semantic tasks like action classification. This talk addresses these limitations by introducing a scalable, video-native approach built on masked auto-encoding. We demonstrate that by focusing evaluation on challenging non-semantic 4D vision tasks—such as point and object tracking, camera pose, and depth estimation—MAE with transformer video models actually scales. Specifically, we show consistent performance improvements as the model size is increased from 20 million up to a new industry record of 22 billion parameters, rigorously confirming the benefits of scaling 4D representations.",
        "qJVkC47kWnc",
        [
            "/images/media/ws2526/20251216_goekay/goekay_1.jpeg",
            "/images/media/ws2526/20251216_goekay/goekay_2.jpeg",
            "/images/media/ws2526/20251216_goekay/goekay_3.jpeg",
        ],
        new Date("2025-12-16")
    ),
    new MediaItem(
        "Test-Time Training Agents for Deep Exploration",
        "Jonas Hübotter (ETH Zurich)",
        "Jonas is a PhD student in the Learning and Adaptive Systems Group at ETH Zurich, advised by Andreas Krause. His research focuses on test-time training and reinforcement learning, with broader interests in probabilistic inference, optimization, and online learning. He received an MSc in Theoretical Computer Science and Machine Learning from ETH Zurich, where he was awarded the ETH Medal, and a BSc in Computer Science and Mathematics from the Technical University of Munich. His work has been published at NeurIPS, ICLR, ICML, and COLM.",
        "The standard paradigm of machine learning separates training and testing. Training aims to learn a model by extracting general rules from data, and testing applies this model to new, unseen data. We study an alternative paradigm where the model is trained at test-time specifically for the given task. We investigate why such test-time training can effectively specialize a model to individual tasks. Further, we demonstrate that such test-time training enables models to continually improve and eventually solve challenging tasks, which are out of reach for the initial model.",
        "7EsrcXXPBRU",
        [],
        new Date("2026-01-13")
    )
];

const mediaItemsToObject = (mediaItems: MediaItem[]) => {
    const obj: Record<string, MediaItem[]> = {};

    mediaItems.sort((a, b) => a.date.getTime() - b.date.getTime()).forEach(x => {
        const offset = x.date.getTimezoneOffset();
        x.date = new Date(x.date.getTime() - (offset * 60 * 1000));
        const dateString = x.date.toISOString().split('T')[0];
        if (!(dateString in obj)) {
            obj[dateString] = [];
        }
        obj[dateString].push(x);
    });

    return obj;
};

export const dayToMediaItems = mediaItemsToObject(mediaItems);
