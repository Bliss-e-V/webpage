export class MediaItem {
    constructor(
        public title: string,
        public speaker: string,
        public speakerIntro: string,
        public abstract: string,
        public videoLink: string,
        public imageUrls: string[],
        public date: Date
    ) {}
}

// Test media items
const mediaItems = [
    new MediaItem(
        "Set Learning for Accurate and Calibrated Models",
        "Thomas Unterthiner (Google DeepMind)",
        "Thomas Unterthiner is a senior research engineer at Google DeepMind. He obtained his PhD in computer science at the Johannes Kepler University Linz, where he worked on several topics in computer vision and bioinformatics.",
        "This presentation focuses on a novel approach called OKO (odd-k-out learning), which aims to enhance the accuracy and calibration of machine learning models. OKO is a user-friendly method that improves model performance by modifying how data points are sampled during training and adjusting the computation of cross-entropy. This principled set learning approach is designed to help machine learning models provide predictions that are not only accurate but also well-balanced and reliable. The talk delves into the technical aspects of OKO and demonstrate its practical applications in improving model calibration and accuracy.",
        "https://www.youtube.com/embed/pR1Zi6Klv44",
        [
            "../../src/images/media/ss24/20240416_unterthiner/20240416_unterthiner1 Large.jpeg",
            "../../src/images/media/ss24/20240416_unterthiner/20240416_unterthiner2 Large.jpeg",
            "../../src/images/media/ss24/20240416_unterthiner/20240416_unterthiner3 Large.jpeg",
            
        ],
        new Date("2024-04-16")
    ),
    new MediaItem(
        "MatterGen: A Generative Model for Inorganic Materials Design",
        "Daniel Zügner (Microsoft AI4Science)",
        "Daniel Zügner is a senior research scientist at Microsoft AI4Science. Previously, he obtained his PhD in computer science at the Technical University of Munich, where he focused on deep learning for graphs and robustness of deep learning.",
        "The proposed diffusion graph neural network leverages typical properties of materials to efficiently and reliably suggest new stable compounds. Additionally, the model uses masked diffusion to generate atom types, further enhancing its predictive capabilities. The approach also supports conditional generation, allowing for the creation of materials with specific properties, such as band gap or bulk modulus. The results are compared against those obtained from density functional theory (DFT)-based workflows, demonstrating the model's effectiveness.",
        "https://www.youtube.com/embed/gmcXvck692k",
        [
        ],
        new Date("2024-04-30")
    ),
    new MediaItem(
        "Towards Open Language Models for Europe",
        "Malte Ostendorff (DFKI)",
        "Malte Ostendorff is researcher at the German Research Center for Artificial Intelligence (DFKI) and did his Ph.D. in the Scientific Information Analytics group at the University of Göttingen, supervised by Prof. Bela Gipp.",
        "“Towards Open Language Models for Europe,” outlines the technical, legal, and organizational challenges of building open, multilingual large language models in academia, emphasizing the need for European data sovereignty and community-driven efforts like the Occiglot project. He advocates for open-source development, efficient training methods, and collaborative contributions to advance LLMs tailored to European languages.",
        "https://www.youtube.com/embed/iXtMgk9nfxI",
        [
            "../../src/images/media/ss24/20240514_ostendorff/ostendorff_1 Large.jpeg",
            "../../src/images/media/ss24/20240514_ostendorff/ostendorff_2 Large.jpeg",
            "../../src/images/media/ss24/20240514_ostendorff/ostendorff_3 Large.jpeg",
            "../../src/images/media/ss24/20240514_ostendorff/ostendorff_5 Large.jpeg",
            "../../src/images/media/ss24/20240514_ostendorff/ostendorff_6 Large.jpeg",
            "../../src/images/media/ss24/20240514_ostendorff/ostendorff_7 Large.jpeg",
        ],
        new Date("2024-05-14")
    ),
    new MediaItem(
        "Natural language representations in brains and machines",
        "Prof. Fatma Deniz (TU Berlin)",
        "Fatma Deniz, Vice President of the TU Berlin as well as Chair of the Language and Communication in Biological and Artificial Systems Lab.",
        "Prof. Deniz' talk deals with Natural language representations in brains and machines.",
        "",
        [
            "../../src/images/media/ss24/20240528_deniz/deniz_1 Large.jpeg",
            "../../src/images/media/ss24/20240528_deniz/deniz_2 Large.jpeg",
            "../../src/images/media/ss24/20240528_deniz/deniz_3 Large.jpeg",
            "../../src/images/media/ss24/20240528_deniz/deniz_4 Large.jpeg",
        ],
        new Date("2024-05-28")
    ),
    new MediaItem(
        "The Science of Decision-Making",
        "Prof. Sanaz Mostaghim (Otto von Guericke University of Magdeburg)",
        "Prof. Sanaz Mostaghim is a full professor of Computer Science at the Otto von Guericke University of Magdeburg and Institute Director at Fraunhofer IVI. She is also a member of the Saxon Academy of Sciences. She holds a PhD in Electrical Engineering and Computer Science from the University of Paderborn (2004), where she focused on bio-inspired optimization methods. She held a postdoctoral position at ETH Zurich and completed her habilitation at Karlsruhe Institute of Technology (KIT) in 2012. In 2014, she was awarded the prestigious DFG Heisenberg Professorship at KIT. Prof. Mostaghim has held visiting positions at Swinburne University (2010) and Yale University (2013). She is an active member of IEEE Computational Intelligence Society, having served as vice president (2021–2024) and in editorial roles for IEEE journals. Her research spans evolutionary optimization, AI, and self-organized systems.",
        "Decision-making is a fundamental aspect of intelligent systems, from autonomous robots to complex optimization problems in science and engineering. This talk provides an overview of research on computational decision-making, focusing on bio-inspired optimization, multi-objective evolutionary algorithms, and AI-driven strategies. It explores how these methods enhance decision processes in dynamic and uncertain environments, with applications ranging from robotics to transportation and infrastructure. The talk highlights the role of AI in developing efficient, adaptive, and explainable decision-making systems.",
        "",
        [
            "../../src/images/media/ws2425/20250204_mostaghim/Mostaghim_1 Large.jpeg",
            "../../src/images/media/ws2425/20250204_mostaghim/Mostaghim_2 Large.jpeg",
            "../../src/images/media/ws2425/20250204_mostaghim/Mostaghim_3 Large.jpeg"
        ],
        new Date("2025-02-04")
    ),
    new MediaItem(
        "Learning Physical Laws from Data",
        "Prof. Sven Wang (HU Berlin)",
        "Prof. Sven Wang is an assistant professor for Mathematical Statistics and Stochastics at the Humboldt University of Berlin. He previously studied mathematics at LMU Munich and Cambridge University and holds a PhD in Mathematical Statistics from Cambridge University. Before he started his position as an assistant professor here in Berlin, he spent two years as a Postdoc at the Massachusetts Institute of Technology (MIT).",
        "Many data collection processes in natural scientific settings are described by partial differential equations (PDEs) and stochastic differential equations (SDEs). In these settings, key statistical tasks such as the estimation of unknown high-dimensional parameters, prediction and uncertainty quantification have given rise to sophisticated frequentist and Bayesian statistical methodology. Recently, 'Scientific Machine Learning' has also played a big role in inferring complex relationships from data. In this talk, we discuss recent mathematical results in this broad context. In particular, we discuss dimension-free statistical convergence results for regression of 'operators' with neural networks, and we discuss the computational complexity of sampling from high-dimensional posterior distributions. If time permits, we will also discuss some mathematical foundations for PDE and SDE-based generative AI models.",
        "https://www.youtube.com/embed/qLb2JKhtswU",
        [
            "../../src/images/media/ws2425/20250121_wang/Wang_1 Large.jpeg",
            "../../src/images/media/ws2425/20250121_wang/Wang_2 Large.jpeg",
            "../../src/images/media/ws2425/20250121_wang/Wang_3 Large.jpeg"
        ],
        new Date("2025-01-21")
    ),
    new MediaItem(
        "Making AI fit for the Life Sciences",
        "Prof. Katharina Baum (FU Berlin)",
        "Dr. Katharina Baum is an Assistant Professor for Data Integration in the Life Sciences at the Free University Berlin’s Institute of Computer Sciences. With a strong background in theoretical biophysics and data science, she has held research positions at renowned institutions, including the Hasso Plattner Institute, Mount Sinai’s Icahn School of Medicine, and the Max Delbrück Center for Molecular Medicine. Her expertise lies at the intersection of mathematics, computer science, and biomedical research, focusing on integrating and analyzing complex biological data. Dr. Baum holds a PhD in Theoretical Biophysics from Humboldt University Berlin and has studied Mathematics at Humboldt University and École Polytechnique in France.",
        "The integration of artificial intelligence and machine learning methods in the life sciences has enabled new insights into complex biological systems. However, the reliability and interpretability of machine learning (ML) models remain critical challenges. This talk explores strategies for informing ML models with domain-specific knowledge to enhance their accuracy and robustness. Additionally, it addresses the importance of quantifying and explaining uncertainty in data-driven analyses to ensure transparency and trust in biomedical applications. ",
        "https://www.youtube.com/embed/J_SI67Muq3w",
        [
            "../../src/images/media/ws2425/20250107_baum/Baum_1 Large.jpeg",
            "../../src/images/media/ws2425/20250107_baum/Baum_2 Large.jpeg",
            "../../src/images/media/ws2425/20250107_baum/Baum_3 Large.jpeg"
        ],
        new Date("2025-01-07")
    ),
    new MediaItem(
        "Combining Reinforcement Learning and Generative Models for de novo Drug Design",
        "Dr. Siboni and Dr. Andres (InstaDeep)",
        "Dr. Nima Siboni and Dr. Miguel Arbesú Andrés are Senior (Applied) Research Engineers at InstaDeep.",
        "This talk explores how generative models can create novel molecular structures while RL fine-tunes these candidates toward desired biological and chemical properties. By incorporating domain-specific constraints and feedback mechanisms, this approach has the potential to accelerate drug discovery, optimizing for both efficacy and synthesizability.",
        "", 
        [
            "../../src/images/media/ws2425/20241217_instadeep/instadeep_1 Large.jpeg",
            "../../src/images/media/ws2425/20241217_instadeep/instadeep_2 Large.jpeg",
            "../../src/images/media/ws2425/20241217_instadeep/instadeep_3 Large.jpeg",
            "../../src/images/media/ws2425/20241217_instadeep/instadeep_4 Large.jpeg",
            // "../../src/images/media/ws2425/20241217_instadeep/shortinstadeep.mp4"
        ],
        new Date("2024-12-17")
    ),
    new MediaItem(
        "Sequential and Active Decision Making: Bandit Theory",
        "Prof. Alexandra Carpentier (University of Potsdam)",
        "Professor Alexandra Carpentier is a Professor of Mathematical Statistics and Machine Learning at the University of Potsdam. She holds a PhD in Mathematical Statistics from INRIA, was a Postdoctoral Researcher at the University of Cambridge and has previously been on faculty at the University of Magdeburg and Université Paris-Nanterre. Her research focuses on sequential decision-making, bandit algorithms, and high-dimensional statistical inference, with applications in machine learning, anomaly detection, and neuroscience. She is the recipient of the prestigious Von Kaven Prize (2020) and serves as an associate editor for several top journals, including the Annals of Statistics and SIAM UQ.",
        "This talk introduces Bandit Theory, a framework for sequential, adaptive learning in uncertain environments with partial information. Inspired by the classic multi-armed bandit problem, where a decision-maker balances exploration and exploitation, this approach extends to settings where actions actively influence the data received. Unlike traditional batch learning, the learner gathers data incrementally, adapting strategies based on observations.",
        "", 
        [
            "../../src/images/media/ws2425/20241203_carpentier/carpentier_1 Large.jpeg",
            "../../src/images/media/ws2425/20241203_carpentier/carpentier_2 Large.jpeg",
            "../../src/images/media/ws2425/20241203_carpentier/carpentier_3 Large.jpeg",
        ],
        new Date("2024-12-03")
    ),
    new MediaItem(
        "Planning in the Age of Learning",
        "Prof. Marc Toussaint (TU Berlin)",
        "Prof. Marc Toussaint is a Full Professor at the Technical University of Berlin, where he leads the Learning and Intelligent Systems Lab. His research focuses on machine learning, robotics, and intelligent decision-making. Previously, he was a Full Professor at the University of Stuttgart, a Max Planck Fellow at the MPI for Intelligent Systems, and led the ML-Robotics lab at Amazon Berlin. Before that, he has held research positions at MIT, Free University of Berlin and the University of Edinburgh. After studies in theoretical physics and neuroinformatics, he obtained his PhD in Adaptive Systems from Ruhr University Bochum.",
        "Marc Toussaint's talk explores how combining traditional model-based planning with modern neural network approaches enables robots to navigate and manipulate complex, unstructured environments. He demonstrates that integrating deep visual constraints and generative models with classical planning techniques can create more adaptable and robust decision-making strategies in robotics.",
        "https://www.youtube.com/embed/hECYh6Pov-s", 
        [
            "../../src/images/media/ws2425/20241119_toussaint/toussaint_1 Large.jpeg",
            "../../src/images/media/ws2425/20241119_toussaint/toussaint_2 Large.jpeg",
            "../../src/images/media/ws2425/20241119_toussaint/toussaint_3 Large.jpeg",
        ],
        new Date("2024-11-19")
    ),
    new MediaItem(
        "The AI Scientist: Towards Fully Automated Open-Ended Scientific Discovery",
        "Robert Lange (Sakana.AI)",
        "Robert Lange is a Research Scientist at Sakana.AI and a PhD student at TU Berlin, working on Evolutionary Meta-Learning. He gained Professional Experiences at Google DeepMind, Science of Intelligence and other research institutions before joining Sakana.AI",
        "Robert Lange's talk, “The AI Scientist,” outlines an innovative pipeline where generative AI automates the research process—from formulating ideas and designing experiments to drafting manuscripts. By integrating iterative code implementation, automated reviewing, and ethical safeguards, the presentation demonstrates how AI can accelerate scientific discovery while keeping human insight in the loop.",
        "https://www.youtube.com/embed/dRDemw05XQM", 
        [
            "../../src/images/media/ws2425/20241105_lange/lange_1 Large.jpeg",
            "../../src/images/media/ws2425/20241105_lange/lange_2 Large.jpeg",
            "../../src/images/media/ws2425/20241105_lange/lange_3 Large.jpeg",
            "../../src/images/media/ws2425/20241105_lange/lange_4 Large.jpeg",
        ],
        new Date("2024-11-05")
    ),
    new MediaItem(
        "The Role of AI in Disinformation Resilience",
        "Dr. Veronika Solopova (TU Berlin)",
        "Veronika Solopova is a PostDoc at TU Berlin and NLP Engineer at Mantis Analytics. Her work is centered around analyses regarding social media and detecting hate speech, propaganda and detecting shitstorms.",
        "Veronika Solopova's talk examines how AI can fortify disinformation resilience by creating transparent, accurate, and adaptable systems for detecting propaganda across diverse languages and media formats. By leveraging sophisticated linguistic features, statistical models, and real-world user feedback, she illustrates a comprehensive approach that empowers journalists, fact-checkers, and policymakers to effectively counter misinformation.",
        "https://www.youtube.com/embed/IEeL9HbzAm8", 
        [
            "../../src/images/media/ws2425/20241022_solopova/solopova_1 Large.jpeg",
            "../../src/images/media/ws2425/20241022_solopova/solopova_2 Large.jpeg",
            "../../src/images/media/ws2425/20241022_solopova/solopova_3 Large.jpeg",
        ],
        new Date("2024-10-22")
    ),
    new MediaItem(
        "Learning molecular models",
        "Prof. Cecilia Clementi (FU Berlin)",
        "Prof. Cecilia Clementi is an Einstein Professor at the FU Berlin Theoretical and Computational Biophysics Lab",
        "Prof. Clementi delves into the exciting intersection of machine learning, experimental science, and molecular modeling. This session offers a comprehensive look at how cutting-edge machine learning techniques can be combined with experimental data to enhance our understanding of molecular dynamics.",
        "https://www.youtube.com/embed/IjICh0Vh8vk", 
        [
            "../../src/images/media/ss24/20240709_clementi/clementi_1 Large.jpeg",
            "../../src/images/media/ss24/20240709_clementi/clementi_2 Large.jpeg",
            "../../src/images/media/ss24/20240709_clementi/clementi_3 Large.jpeg",
        ],
        new Date("2024-07-09")
    ),
    new MediaItem(
        "Intelligent Flying Multi-Robot Systems",
        "Prof. Wolfgang Hoenig (TU Berlin)",
        "Prof. Wolfgang Hönig is an assistant professor at TU Berlin, leading the Intelligent Multi-Robot Coordination Lab. The focus is on developing methods for large teams of robots to collaborate on real-world tasks, utilizing informed search, optimization, and machine learning techniques.",
        "Wolfgang Hönig's presentation explores cutting‐edge techniques for enabling intelligent flying multi-robot systems, where advanced machine learning models integrate seamlessly with motion planning and control to enhance safety and coordination. By leveraging neural interaction models and conflict-based search algorithms, the talk demonstrates how AI can effectively address the complex challenges of autonomous aerial teamwork.",
        "https://www.youtube.com/embed/hMjQWJC6Ed8", 
        [
            "../../src/images/media/ss24/20240611_hoenig/hoenig_1 Large.jpeg",
            "../../src/images/media/ss24/20240611_hoenig/hoenig_2 Large.jpeg",
            "../../src/images/media/ss24/20240611_hoenig/hoenig_3 Large.jpeg",
            "../../src/images/media/ss24/20240611_hoenig/hoenig_4 Large.jpeg",
        ],
        new Date("2024-06-11")
    ),
];

// Convert media items to an object similar to dayToPapers
const mediaItemsToObject = (mediaItems: MediaItem[]) => {
    const obj = {};

    mediaItems.sort((a, b) => a.date - b.date).forEach(x => {
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