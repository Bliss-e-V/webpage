import doubleDQNImage from "../../images/posts/01-11-23-double-dqn/ogImage.png";
import rainbowImage from "../../images/posts/05-12-23-rainbow/ogImage.png";
import mt3MusicTranscriptionImage from "../../images/posts/06-02-24-music-transcription/ogImage.jpg";
import metaLearningCircuitsImage from "../../images/posts/06-06-23-meta-learning-circuits/ogImage.jpg";
import prioritizedERImage from "../../images/posts/07-11-23-prioritized-er/ogImage.png";
import vqvaeImage from "../../images/posts/09-01-24-vqvae/ogImage.png";
import autoencodersLearnersImage from "../../images/posts/11-07-23-autoencoders-scalable-learners/ogImage.png";
import agent57Image from "../../images/posts/12-12-23-agent57/ogImage.png";
import dopamineImage from "../../images/posts/13-06-23-dopamine/ogImage.jpg";
import distributionalPerspectiveImage from "../../images/posts/15-11-23-distributional-perspective/ogImage.png";
import jukeboxImage from "../../images/posts/16-01-24-jukebox/ogImage.png";
import rlDuetImage from "../../images/posts/19-12-23-rl-duet/ogImage.png";
import patternMusicGenerationImage from "../../images/posts/20-06-23-pattern-based-music-generation/ogImage.png";
import humanLevelControlImage from "../../images/posts/22-10-23-human-level-control-through-deep-rl/ogImage.png";
import neuralAudioCompressionImage from "../../images/posts/23-01-24-encodec/ogImage.png";
import noisyNetsImage from "../../images/posts/24-11-23-noisy-nets/ogImage.png";
import bytesIsAllYouNeedImage from "../../images/posts/27-06-23-bytes-is-all-you-need/ogImage.png";
import voiceboxImage from "../../images/posts/images/voicebox.png";
import musicLMImage from "../../images/posts/30-01-24-musiclm/ogImage.png";
import duelingArchitecturesDRLImage from "../../images/posts/30-10-23-dueling-architectures-for-drl/ogImage.png";

import intriguingPropertiesContrastiveLossesImage from "../../images/posts/images/Intriguing Properties of Contrastive Losses.png";
import bootstrapYourOwnLatentImage from "../../images/posts/images/Bootstrap your own latent.png";
import emergingPropertiesVisionTransformersImage from "../../images/posts/images/Emerging Properties in SelfSupervised Vision Transformers.png";
import visionTransformersNeedRegistersImage from "../../images/posts/images/Vision Transformers Need Registers.png";
import selfSupervisedLearningImagesImage from "../../images/posts/images/Self-Supervised Learning from Images with a Joint-Embedding Predictive Architecture.png";
import whatDoSsvtLearnImage from "../../images/posts/images/What do Self Supervised Vision Transformers Learn.png";
import revealingDarkSecretsImage from "../../images/posts/images/Revealing the Dark Secrets of Masked Image Modeling.png";
import sgdImage from "../../images/posts/images/SGD.png";
import addedGradientNoiseImage from "../../images/posts/images/Added Gradient Noise.png";
import importanceInitializationMomentumImage from "../../images/posts/images/On the importance of initialization and momentum in deep learning.png";
import adamOptimizerImage from "../../images/posts/images/Adam A Method for Stochastic Optimization.png";
import strongAugmentationsImage from "../..//images/posts/images/Can We Break Free from Strong Data Augmentations in Self-Supervised Learning.png"
import nlpIntroImage from "../../images/posts/images/NLP Introduction.png";
import illustratedTransImage from "../../images/posts/images/illustrated_trans.png";
import chinchillaImage from "../../images/posts/images/chinchilla.png";
import megatronImage from "../../images/posts/images/megatron.png";
import rlhfImage from "../../images/posts/images/rlhf.png";
import selfCorrect from "../../images/posts/images/self-correct.png";
import bytePair from "../../images/posts/images/byte-pair.png";
import transformerCircuts from "../../images/posts/images/transformer_circuits.png";
import superposition from "../../images/posts/images/superposition.png";
import monet from "../../images/posts/images/monet.png";
import refusal from "../../images/posts/images/refusal.png";
import monosematicity from "../../images/posts/images/monosemanticity.png";
import scalingMono from "../../images/posts/images/scaling_mono.png";
import dictLearning from "../../images/posts/images/dict_learning.png";
import switchSAE from "../../images/posts/images/SwitchSAE.png";
import transcoders from "../../images/posts/images/Transcoders.png";
import sparseCircuits from "../../images/posts/images/SparseCircuits.png";
import paramSpace from "../../images/posts/images/ParamSpace.png";
import foundationPathCancer from "../../images/posts/images/20250428_foundationModelPathCancer.png";
import visLangPath from "../../images/posts/images/20250505_visLangPathologyFoundation.png";
import transMil from "../../images/posts/images/20250512_transmil.png"
import multimodalPath from "../../images/posts/images/20250519_multimodalPath.png";
import scalingViT from "../../images/posts/images/20250526_scalingViT.png";
import prism from "../../images/posts/images/20250602_prism.png";

import gilmer from "../../images/posts/images/20250609_gilmer17.png";
import gasteiger from "../../images/posts/images/20250616_gasteiger20.png";
import satorras from "../../images/posts/images/20250623_satorras22.png";
import hu from "../../images/posts/images/20250630_hu21.png";
import joshi from "../../images/posts/images/20250707_joshi24.png";

export class Paper {
    constructor(public name: string, public authors: string[], public link: string, public image: ImageMetadata, public readingDay: Date) {
    }
}

export class Section {
    constructor(
        public title: string,
        public host: string,
        public startDate: Date,
        public endDate: Date,
        public description: string
    ) { }
}

// --------------------------------------------------
// Define sections
const sections: Section[] = [
    new Section(
        "Unstructured Papers",
        "Jarek Liesen",
        new Date("2023-01-23"),
        new Date("2023-07-11"),
        "We read papers based on proposals from the group"
    ),
    new Section(
        "Deep Q-Learning",
        "Jarek Liesen",
        new Date("2023-10-22"),
        new Date("2023-12-12"),
        "Introduction to deep reinforcement learning by exploration of many relevant and foundational papers"
    ),
    new Section(
        "Audio and AI",
        "Leo Pinetzki",
        new Date("2023-12-19"),
        new Date("2024-02-13"),
        "We Heard You Like AI so here we explored many audio related papers"
    ),
    new Section(
        "Self-Supervised Learning",
        "Jakob Hackstein",
        new Date("2024-04-23"),
        new Date("2024-06-04"),
        "Something students should know about. Its super effective in learning representations from unlabeled data."
    ),
    new Section(
        "Optimizers",
        "Jarek Liesen",
        new Date("2024-06-18"),
        new Date("2024-07-01"),
        "We read papers about optimizers and their properties to learn how to optimize even further"
    ),
    new Section(
        "LLMs and Language Modeling",
        "Raphael Reinauer",
        new Date("2024-09-21"),
        new Date("2024-11-09"),
        "Long story short, we read papers about language models and language modeling"
    ),
    new Section(
        "Mechanistic Interpretability",
        "Lorenz Hufe",
        new Date("2024-11-16"),
        new Date("2025-03-17"),
        "Sometimes everybody needs to know what is going on inside a (language) model"
    ),
    new Section(
        "AI in Medicine",
        "Tom Neuhäuser",
        new Date("2025-04-01"),
        new Date("2025-06-03"),
        "A deep dive into the world of multimodal foundation models for histopathology."
    ),
    new Section(
        "Geometric Graph Neural Network",
        "Gregor Lied",
        new Date("2025-06-04"),
        new Date("2025-09-30"),
        "This reading group investigates the theoretical foundations and architectural design space of Geometric Graph Neural Networks for 3D atomic systems."
    ),
]

// --------------------------------------------------
// modify HERE to add papers
// remember months go from 0 to 11!
const papers = [
    new Paper("Meta-Learning the Inductive Biases of Simple Neural Circuits", ["William Dorrell", "Maria Yuffa", "Peter Latham"], "https://arxiv.org/abs/2211.13544", metaLearningCircuitsImage, new Date("2023-06-06")),
    new Paper("Dopamine and temporal difference learning - A fruitful relationship between neuroscience and AI", ["Will Dabney", "Zeb Kurth-Nelson"], "https://deepmind.google/discover/blog/dopamine-and-temporal-difference-learning-a-fruitful-relationship-between-neuroscience-and-ai/", dopamineImage, new Date("2023-06-13")),
    new Paper("Pattern-Based Music Generation with Wasserstein Autoencoders and PRC Descriptions", ["Valentijn Borghuis", "Luca Angioloni", "Lorenzo Brusci", "Paolo Frasconi"], "https://www.ijcai.org/Proceedings/2020/0751.pdf", patternMusicGenerationImage, new Date("2023-06-20")),
    new Paper("Bytes is all you need", ["Maxwell Horton", "Sachin Mehta", "Ali Farhadi", "Mohammad Rastegari"], "https://arxiv.org/pdf/2306.00238.pdf", bytesIsAllYouNeedImage, new Date("2023-06-27")),
    new Paper("Masked Autoencoders Are Scalable Vision Learners", ["Kaiming He", "Xinlei Chen", "Saining Xie", "Yanghao Li", "Piotr Dollár", "Ross Girshick"], "https://arxiv.org/abs/2111.06377", autoencodersLearnersImage, new Date("2023-07-11")),
    new Paper("Human-level Control through Deep Reinforcement Learning", ["Volodymyr Mnih", "K. Kavukcuoglu", "David Silver", "Andrei A. Rusu", "J. Veness", "Marc G. Bellemare", "Alex Graves", "Martin A. Riedmiller", "A. Fidjeland", "Georg Ostrovski", "Stig Petersen", "Charlie Beattie", "Amir Sadik", "Ioannis Antonoglou", "Helen King", "D. Kumaran", "Daan Wierstra", "S. Legg", "D. Hassabis"], "https://www.nature.com/articles/nature14236", humanLevelControlImage, new Date("2023-10-22")),
    new Paper("Dueling Network Architectures for Deep Reinforcement Learning", ["Ziyu Wang", "Tom Schaul", "Matteo Hessel", "Hado van Hasselt", "Marc Lanctot", "Nando de Freitas"], "https://arxiv.org/abs/1511.06581", duelingArchitecturesDRLImage, new Date("2023-10-30")),
    new Paper("Deep Reinforcement Learning with Double Q-learning", ["Hado van Hasselt", "Arthur Guez", "David Silver"], "https://arxiv.org/abs/1509.06461", doubleDQNImage, new Date("2023-11-01")),
    new Paper("Prioritized Experience Replay", ["Tom Schaul", "John Quan", "Ioannis Antonoglou", "David Silver"], "https://arxiv.org/abs/1511.05952", prioritizedERImage, new Date("2023-11-07")),
    new Paper("A Distributional Perspective on Reinforcement Learning", ["Marc G. Bellemare", "Will Dabney", "Rémi Munos"], "https://arxiv.org/abs/1707.06887", distributionalPerspectiveImage, new Date("2023-11-15")),
    new Paper("Noisy Networks for Exploration", ["Meire Fortunato", "Mohammad Gheshlaghi Azar", "Bilal Piot", "Jacob Menick", "Ian Osband", "Alex Graves", "Vlad Mnih", "Remi Munos", "Demis Hassabis", "Olivier Pietquin", "Charles Blundell", "Shane Legg"], "https://arxiv.org/abs/1706.10295", noisyNetsImage, new Date("2023-11-24")),
    new Paper("Rainbow: Combining Improvements in Deep Reinforcement Learning", ["Matteo Hessel", "Joseph Modayil", "Hado van Hasselt", "Tom Schaul", "Georg Ostrovski", "Will Dabney", "Dan Horgan", "Bilal Piot", "Mohammad Azar", "David Silver"], "https://arxiv.org/abs/1710.02298", rainbowImage, new Date("2023-12-05")),
    new Paper("Agent57: Outperforming the Atari Human Benchmark", ["Adrià Puigdomènech Badia", "Bilal Piot", "Steven Kapturowski", "Pablo Sprechmann", "Alex Vitvitskyi", "Daniel Guo", "Charles Blundell"], "https://arxiv.org/abs/2003.13350", agent57Image, new Date("2023-12-12")),
    new Paper("RL-Duet - Online Music Accompaniment Generation Using Deep Reinforcement Learning", ["Nan Jiang", "Sheng Jin", "Zhiyao Duan", "Changshui Zhang"], "https://arxiv.org/abs/2002.03082", rlDuetImage, new Date("2023-12-19")),
    new Paper("Neural Discrete Representation Learning", ["Aaron van den Oord", "Oriol Vinyals", "Koray Kavukcuoglu"], "https://arxiv.org/abs/1711.00937", vqvaeImage, new Date("2024-01-09")),
    new Paper("Jukebox A Generative Model for Music", ["Prafulla Dhariwal", "Heewoo Jun", "Christine Payne", "Jong Wook Kim", "Alec Radford", "Ilya Sutskever"], "https://arxiv.org/abs/2005.00341", jukeboxImage, new Date("2024-01-16")),
    new Paper("High Fidelity Neural Audio Compression", ["Alexandre Défossez", "Jade Copet", "Gabriel Synnaeve", "Yossi Adi"], "https://arxiv.org/abs/2210.13438", neuralAudioCompressionImage, new Date("2024-01-23")),
    new Paper("MusicLM: Generating Music From Text", ["Andrea Agostinelli", "Timo I. Denk", "Zalán Borsos", "Jesse Engel", "Mauro Verzetti", "Antoine Caillon", "Qingqing Huang", "Aren Jansen", "Adam Roberts", "Marco Tagliasacchi", "Matt Sharifi", "Neil Zeghidour", "Christian Frank"], "https://arxiv.org/abs/2301.11325", musicLMImage, new Date("2024-01-30")),
    new Paper("MT3 Multi-Task Multitrack Music Transcription", ["Josh Gardner", "Ian Simon", "Ethan Manilow", "Curtis Hawthorne", "Jesse Engel"], "https://arxiv.org/abs/2111.03017", mt3MusicTranscriptionImage, new Date("2024-02-06")),
    new Paper("Voicebox: Text-Guided Multilingual Universal Speech Generation at Scale", ["Matthew Le", "Apoorv Vyas", "Bowen Shi", "Brian Karrer", "Leda Sari", "Rashel Moritz", "Mary Williamson", "Vimal Manohar", "Yossi Adi", "Jay Mahadeokar", "Wei-Ning Hsu"], "https://arxiv.org/abs/2306.15687", voiceboxImage, new Date("2024-02-13")),
    new Paper("Intriguing Properties of Contrastive Losses", ["Ting Chen", "Calvin Luo", "Lala Li"], "https://arxiv.org/abs/2011.02803", intriguingPropertiesContrastiveLossesImage, new Date("2024-04-23")),
    new Paper("Bootstrap your own latent: A new approach to self-supervised Learning", ["Jean-Bastien Grill", "Florian Strub", "Florent Altché", "Corentin Tallec", "Pierre H. Richemond", "Elena Buchatskaya", "Carl Doersch", "Bernardo Avila Pires", "Zhaohan Daniel Guo", "Mohammad Gheshlaghi Azar", "Bilal Piot", "Koray Kavukcuoglu", "Rémi Munos", "Michal Valko"], "https://arxiv.org/abs/2006.07733", bootstrapYourOwnLatentImage, new Date("2024-04-23")),
    new Paper("Emerging Properties in Self-Supervised Vision Transformers", ["Mathilde Caron", "Hugo Touvron", "Ishan Misra", "Hervé Jégou", "Julien Mairal", "Piotr Bojanowski", "Armand Joulin"], "https://arxiv.org/pdf/2104.14294.pdf", emergingPropertiesVisionTransformersImage, new Date("2024-05-07")),
    new Paper("Vision Transformers Need Registers", ["Timothée Darcet", "Maxime Oquab", "Julien Mairal", "Piotr Bojanowski"], "https://arxiv.org/pdf/2309.16588.pdf", visionTransformersNeedRegistersImage, new Date("2024-05-07")),
    new Paper("Self-Supervised Learning from Images with a Joint-Embedding Predictive Architecture", ["Mahmoud Assran", "Quentin Duval", "Ishan Misra", "Piotr Bojanowski", "Pascal Vincent", "Michael Rabbat", "Yann LeCun", "Nicolas Ballas"], "https://arxiv.org/pdf/2301.08243.pdf", selfSupervisedLearningImagesImage, new Date("2024-05-21")),
    new Paper("What do Self Supervised Vision Transformers Learn?", ["Namuk Park", "Wonjae Kim", "Byeongho Heo", "Taekyung Kim", "Sangdoo Yun"], "https://arxiv.org/pdf/2305.00729.pdf", whatDoSsvtLearnImage, new Date("2024-05-21")),
    new Paper("Revealing the Dark Secrets of Masked Image Modeling", ["Zhenda Xie", "Zigang Geng", "Jingcheng Hu", "Zheng Zhang", "Han Hu", "Yue Cao"], "https://arxiv.org/abs/2205.13543", revealingDarkSecretsImage, new Date("2024-06-04")),
    new Paper("Can We Break Free from Strong Data Augmentations in Self-Supervised Learning?", ["Shruthi Gowda1", "Elahe Arani", "Bahram Zonooz"], "https://arxiv.org/pdf/2404.09752", strongAugmentationsImage, new Date("2024-06-04")),
    new Paper("Stochastic Gradient Descend", ["appliedprobability"], "https://appliedprobability.blog/2019/01/26/robbins-munro-2/", sgdImage, new Date("2024-06-18")),
    new Paper("Adding Gradient Noise Improves Learning for Very Deep Networks", ["Arvind Neelakantan", "Luke Vilnis", "Quoc V. Le", "Ilya Sutskever", "Lukasz Kaiser", "Karol Kurach", "James Martens"], "https://arxiv.org/pdf/1511.06807.pdf", addedGradientNoiseImage, new Date("2024-06-18")),
    new Paper("On the importance of initialization and momentum in deep learning", ["Ilya Sutskever", "James Martens", "George Dahl", "Geoffrey Hinton"], "https://proceedings.mlr.press/v28/sutskever13.html", importanceInitializationMomentumImage, new Date("2024-07-01")),
    new Paper("Adam: A Method for Stochastic Optimization", ["Diederik P. Kingma", "Jimmy Ba"], "https://arxiv.org/abs/1412.6980", adamOptimizerImage, new Date("2024-07-01")),
    new Paper("Natural Language Processing, Chapter 6", ["Jacob Eisenstein"], "https://cseweb.ucsd.edu/~nnakashole/teaching/eisenstein-nov18.pdf", nlpIntroImage, new Date("2024-09-21")),
    new Paper("Formal Algorithms for Transformers", ["Mary Phuong, Marcus Hutter"], "https://arxiv.org/pdf/2207.09238", illustratedTransImage, new Date("2024-09-28")),
    new Paper("Language Models are Few-Shot Learners, Chapter 3", ["Tom B. Brown", "Benjamin Mann", "Nick Ryder", "Melanie Subbiah", "Jared Kaplan", "Prafulla Dhariwal", "Arvind Neelakantan", "Pranav Shyam", "Girish Sastry", "Amanda Askell", "Sandhini Agarwal", "Ariel Herbert-Voss", "Gretchen Krueger", "Tom Henighan", "Rewon Child", "Aditya Ramesh", "Daniel M. Ziegler", "Jeffrey Wu", "Clemens Winter", "Christopher Hesse", "Mark Chen", "Eric Sigler", "Mateusz Litwin", "Scott Gray", "Benjamin Chess", "Jack Clark", "Christopher Berner", "Sam McCandlish", "Alec Radford", "Ilya Sutskever", "Dario Amodei"], "https://arxiv.org/abs/2005.14165", doubleDQNImage, new Date("2024-10-04")),
    new Paper("A Formal Perspective on Byte-Pair Encoding", ["Vilém Zouhar", "Clara Meister", "Juan Luis Gastaldi", "Li Du", "Tim Vieira", "Mrinmaya Sachan", "Ryan Cotterell"], "https://arxiv.org/abs/2306.16837", bytePair, new Date("2024-10-11")),
    new Paper("Training Compute-Optimal Large Language Models", ["Jordan Hoffmann", "Sebastian Borgeaud", "Arthur Mensch", "Elena Buchatskaya", "Trevor Cai", "Eliza Rutherford", "Diego de Las Casas", "Lisa Anne Hendricks", "Johannes Welbl", "Aidan Clark", "Tom Hennigan", "Eric Noland", "Katie Millican", "George van den Driessche", "Bogdan Damoc", "Aurelia Guy", "Simon Osindero", "Karen Simonyan", "Erich Elsen", "Jack W. Rae", "Oriol Vinyals", "Laurent Sifre"], "https://arxiv.org/abs/2203.15556", chinchillaImage, new Date("2024-10-18")),
    new Paper("Megatron-LM: Training Multi-Billion Parameter Language Models Using Model Parallelism", ["Mohammad Shoeybi", "Mostofa Patwary", "Raul Puri", "Patrick LeGresley", "Jared Casper", "Bryan Catanzaro"], "https://arxiv.org/abs/1909.08053", megatronImage, new Date("2024-10-25")),
    new Paper("Training language models to follow instructions with human feedback", ["Long Ouyang", "Jeff Wu", "Xu Jiang", "Diogo Almeida", "Carroll L. Wainwright", "Pamela Mishkin", "Chong Zhang", "Sandhini Agarwal", "Katarina Slama", "Alex Ray", "John Schulman", "Jacob Hilton", "Fraser Kelton", "Luke Miller", "Maddie Simens", "Amanda Askell", "Peter Welinder", "Paul Christiano", "Jan Leike", "Ryan Lowe"], "https://arxiv.org/abs/2203.02155", rlhfImage, new Date("2024-11-02")),
    new Paper("Training Language Models to Self-Correct via Reinforcement Learning", ["Aviral Kumar", "Vincent Zhuang", "Rishabh Agarwal", "Yi Su", "JD Co-Reyes", "Avi Singh", "Kate Baumli", "Shariq Iqbal", "Colton Bishop", "Rebecca Roelofs", "Lei M Zhang", "Kay McKinney", "Disha Shrivastava", "Cosmin Paduraru", "George Tucker", "Doina Precup", "Feryal Behbahani", "Aleksandra Faust"], "https://arxiv.org/pdf/2409.12917", selfCorrect, new Date("2024-11-09")),
    new Paper("A Mathematical Framework for Transformer Circuits", ["Nelson Elhage", "Neel Nanda", "Catherine Olsson", "Tom Henighan†", "Nicholas Joseph†", "Ben Mann†", "Amanda Askell", "Yuntao Bai", "Anna Chen", "Tom Conerly", "Nova DasSarma", "Dawn Drain", "Deep Ganguli", "Zac Hatfield-Dodds", "Danny Hernandez", "Andy Jones", "Jackson Kernion", "Liane Lovitt", "Kamal Ndousse", "Dario Amodei", "Tom Brown", "Jack Clark", "Jared Kaplan", "Sam McCandlish", "Chris Olah"], "https://transformer-circuits.pub/2021/framework/index.html", transformerCircuts, new Date("2024-11-16")),
    new Paper("Toy Models of Superposition", ["Nelson Elhage", "Tristan Hume", "Catherine Olsson", "Nicholas Schiefer", "Tom Henighan", "Shauna Kravec", "Zac Hatfield-Dodds", "Robert Lasenby", "Dawn Drain", "Carol Chen", "Roger Grosse", "Sam McCandlish", "Jared Kaplan", "Dario Amodei", "Martin Wattenberg", "Christopher Olah"], "https://transformer-circuits.pub/2022/toy_model/index.html", superposition, new Date("2025-01-13")),
    new Paper("Towards Monosemanticity: Decomposing Language Models With Dictionary Learning", ["Trenton Bricken", "Adly Templeton", "Joshua Batson", "Brian Chen", "Adam Jermyn", "Tom Conerly", "Nicholas L Turner", "Cem Anil", "Carson Denison", "Amanda Askell", "Robert Lasenby", "Yifan Wu", "Shauna Kravec", "Nicholas Schiefer", "Tim Maxwell", "Nicholas Joseph", "Alex Tamkin", "Karina Nguyen", "Brayden McLean", "Josiah E Burke", "Tristan Hume", "Shan Carter", "Tom Henighan", "Chris Olah"], "https://transformer-circuits.pub/2023/monosemantic-features/index.html", monosematicity, new Date("2025-01-20")),
    new Paper("Refusal in Language Models Is Mediated by a Single Direction", ["Andy Arditi", "Oscar Obeso", "Aaquib Syed", "Daniel Paleka", "Nina Panickssery", "Wes Gurnee", "Neel Nanda"], "https://arxiv.org/pdf/2406.11717#page=29.09", refusal, new Date("2025-01-27")),
    new Paper("Scaling Monosemanticity: Extracting Interpretable Features from Claude 3 Sonnet", ["Adly Templeton", "Tom Conerly", "Jonathan Marcus", "Jack Lindsey", "Trenton Bricken", "Brian Chen", "Adam Pearce", "Craig Citro", "Emmanuel Ameisen", "Andy Jones", "Hoagy Cunningham", "Nicholas L Turner", "Callum McDougall", "Monte MacDiarmid", "Alex Tamkin", "Esin Durmus", "Tristan Hume", "Francesco Mosconi", "C. Daniel Freeman", "Theodore R. Sumers", "Edward Rees", "Joshua Batson", "Adam Jermyn", "Shan Carter", "Chris Olah", "Tom Henighan"], "https://transformer-circuits.pub/2024/scaling-monosemanticity/index.html", scalingMono, new Date("2025-02-03")),
    new Paper("Efficient Dictionary Learning with Switch Sparse Autoencoders", ["Anish Mudide", "Joshua Engels", "Eric J. Michaud", "Max Tegmark", "Christian Schroeder de Witt"], "https://arxiv.org/abs/2410.08201", switchSAE, new Date("2025-02-10")),
    new Paper("Monet: Mixture of Monosemantic Experts for Transformers", ["Jungwoo Park", "Young Jin Ahn", "Kee-Eung Kim", "Jaewoo Kang"], "https://arxiv.org/abs/2412.04139", monet, new Date("2025-02-17")),
    new Paper("Sparse Feature Circuits: Discovering and Editing Interpretable Causal Graphs in Language Models", ["Samuel Marks", "Can Rager", "Eric J. Michaud", "Yonatan Belinkov", "David Bau", "Aaron Mueller"], "https://arxiv.org/abs/2403.19647", sparseCircuits, new Date("2025-03-03")),
    new Paper("Transcoders Find Interpretable LLM Feature Circuits", ["Jacob Dunefsky", "Philippe Chlenski", "Neel Nanda"], "https://arxiv.org/abs/2406.11944", transcoders, new Date("2025-03-10")),
    new Paper("Interpretability in Parameter Space: Minimizing Mechanistic Description Length with Attribution-based Parameter Decomposition", ["Dan Braun", "Lucius Bushnaq", "Stefan Heimersheim", "Jake Mendel", "Lee Sharkey"], "https://arxiv.org/abs/2501.14926", paramSpace, new Date("2025-03-17")),
    new Paper("A foundation model for clinical-grade computational pathology and rare cancers detection", ["Eugene Vorontsov", "Alican Bozkurt", "Adam Casson", "George Shaikovski", "Michal Zelechowski", "Kristen Severson", "Eric Zimmermann", "James Hall", "Neil Tenenholtz", "Nicolo Fusi", "Ellen Yang", "Philippe Mathieu", "Alexander van Eck", "Donghun Lee", "Julian Viret", "Eric Robert", "Yi Kan Wang", "Jeremy D. Kunz", "Matthew C. H. Lee", "Jan H. Bernhard", "Ran A. Godrich", "Gerard Oakley", "Ewan Millar", "Matthew Hanna", "Hannah Wen", "Juan A. Retamero", "William A. Moye", "Razik Yousfi", "Christopher Kanan", "David S. Klimstra", "Brandon Rothrock", "Siqi Liu", "Thomas J. Fuchs"], "https://www.nature.com/articles/s41591-024-03141-0.pdf", foundationPathCancer, new Date("2025-04-28")),
    new Paper("A visual-language foundation model for computational pathology", ["Ming Y. Lu", "Bowen Chen", "Drew F. K. Williamson", "Richard J. Chen", "Ivy Liang", "Tong Ding", "Guillaume Jaume", "Igor Odintsov", "Long Phi Le", "Georg Gerber", "Anil V. Parwani", "Andrew Zhang", "Faisal Mahmood"], "https://www.nature.com/articles/s41591-024-02856-4.epdf?sharing_token=oxrnoCI4J4GotgQPtYqhxtRgN0jAjWel9jnR3ZoTv0PmeocnzHdxO4Q-z304lTFOE9gfAQ4aOUdEe1q7KpOZrJPvH2xnU6NL0L0gf1Wy5LPTCE_ptjKfk7dLA2eG5opNjEHop5oOAfB60GZRNBQbXXwltaWADikm_fOMbypyiWA%3D", visLangPath, new Date("2025-05-05")),
    new Paper("Transmil: Transformer based Correlated Multiple Instance Learning for Whole Slide Image Classification", ["Zhuchen Shao", "Hao Bian", "Yang Chen", "Yifeng Wang", "Jian Zhang", "Xiangyang Ji", "Yongbing Zhang"], "https://proceedings.neurips.cc/paper/2021/file/10c272d06794d3e5785d5e7c5356e9ff-Paper.pdf", transMil, new Date("2025-05-12")),
    new Paper("A multimodal generative AI copilot for human pathology", ["Ming Y. Lu", "Bowen Chen", "Drew F. K. Williamson", "Richard J. Chen", "Melissa Zhao", "Aaron K. Chow", "Kenji Ikemura", "Ahrong Kim", "Dimitra Pouli", "Ankush Patel", "Amr Soliman", "Chengkuan Chen", "Tong Ding", "Judy J. Wang", "Georg Gerber", "Ivy Liang", "Long Phi Le", "Anil V. Parwani", "Luca L. Weishaupt", "Faisal Mahmood"], "https://www.nature.com/articles/s41586-024-07618-3.pdf", multimodalPath, new Date('2025-05-19')),
    new Paper("Scaling Vision Transformers to Gigapixel Images via Hierarchical Self-Supervised Learning", ["Richard J. Chen", "Chengkuan Chen", "Yicong Li", "Tiffany Y. Chen", "Andrew D. Trister", "Rahul G. Krishnan", "Faisal Mahmood"], "https://arxiv.org/pdf/2206.02647", scalingViT, new Date('2025-05-26')),
    new Paper("PRISM: A Multi-Modal Generative Foundation Model for Slide-Level Histopathology", ["George Shaikovski", "Adam Casson", "Kristen Severson", "Eric Zimmermann", "Yi Kan Wang", "Jeremy D. Kunz", "Juan A. Retamero", "Gerard Oakley", "David Klimstra", "Christopher Kanan", "Matthew Hanna", "Michal Zelechowski", "Julian Viret", "Neil Tenenholtz", "James Hall", "Nicolo Fusi", "Razik Yousfi", "Peter Hamilton", "William A. Moye", "Eugene Vorontsov", "Siqi Liu", "Thomas J. Fuchs"], "https://arxiv.org/pdf/2405.10254", prism, new Date('2025-06-02')),
    new Paper("Neural Message Passing for Quantum Chemistry", ["Justin Gilmer", "Samuel S. Schoenholz", "Patrick F. Riley", "Oriol Vinyals", "George E. Dahl"], "https://arxiv.org/pdf/1704.01212", gilmer, new Date("2025-06-09")),
    new Paper("Directional Message Passing for Molecular Graphs", ["Johannes Gasteiger", "Janek Groß", "Stephan Günnemann"], "https://arxiv.org/pdf/2003.03123", gasteiger, new Date("2025-06-16")),
    new Paper("E(n) Equivariant Graph Neural Networks", ["Victor Garcia Satorras", "Emiel Hoogeboom", "Max Welling"], "https://arxiv.org/pdf/2102.09844", satorras, new Date("2025-06-23")),
    new Paper("ForceNet: A Graph Neural Network for Large-Scale Quantum Calculations", ["Weihua Hu", "Muhammed Shuaibi", "Abhishek Das", "Siddharth Goyal", "Anuroop Sriram", "Jure Leskovec", "Devi Parikh", "C. Lawrence Zitnick"], "https://arxiv.org/pdf/2103.01436", hu, new Date("2025-06-30")),
    new Paper("On the Expressive Power of Geometric Graph Neural Networks", ["Chaitanya K. Joshi", "Cristian Bodnar", "Simon V. Mathis", "Taco Cohen", "Pietro Liò"], "https://arxiv.org/pdf/2301.09308", joshi, new Date("2025-07-07")),
];

// --------------------------------------------------

const papersToObject = (papers: Paper[]) => {
    const obj = {}

    papers.sort((a, b) => a.readingDay - b.readingDay).forEach(x => {
        const offset = x.readingDay.getTimezoneOffset()
        x.readingDay = new Date(x.readingDay.getTime() - (offset * 60 * 1000))
        const dateString = x.readingDay.toISOString().split('T')[0]
        if (!(dateString in obj)) {
            obj[dateString] = []
        }
        obj[dateString].push(x)
    })

    return obj
}

export const dayToPapers = papersToObject(papers)
export const readingGroupSections = sections
