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
import rmsPropImage from "../../images/posts/images/Neural Networks for Machine Learning.png";
import adamOptimizerImage from "../../images/posts/images/Adam A Method for Stochastic Optimization.png";
import symbolicOptimizationAlgorithmsImage from "../../images/posts/images/Symbolic Discovery of Optimization Algorithms.png";
import veloTrainingImage from "../../images/posts/images/VeLO Training Versatile Learned Optimizers by Scaling Up.png";


export class Paper {
    constructor(public name: string, public authors: string[], public link: string, public image: ImageMetadata, public readingDay: Date) {
    }
}

// --------------------------------------------------
// modify HERE to add papers
// remember months go from 0 to 11!
const papers = [
    new Paper("Deep Reinforcement Learning with Double Q-learning", ["Hado van Hasselt", "Arthur Guez", "David Silver"], "https://arxiv.org/abs/1509.06461", doubleDQNImage, new Date(2023, 10, 1)),
    new Paper("Rainbow: Combining Improvements in Deep Reinforcement Learning", ["Matteo Hessel", "Joseph Modayil", "Hado van Hasselt", "Tom Schaul", "Georg Ostrovski", "Will Dabney", "Dan Horgan", "Bilal Piot", "Mohammad Azar", "David Silver"], "https://arxiv.org/abs/1710.02298", rainbowImage, new Date(2023, 11, 5)),
    new Paper("MT3 Multi-Task Multitrack Music Transcription", ["Josh Gardner", "Ian Simon", "Ethan Manilow", "Curtis Hawthorne", "Jesse Engel"], "https://arxiv.org/abs/2111.03017", mt3MusicTranscriptionImage, new Date(2024, 1, 6)),
    new Paper("Meta-Learning the Inductive Biases of Simple Neural Circuits", ["William Dorrell", "Maria Yuffa", "Peter Latham"], "https://arxiv.org/abs/2211.13544", metaLearningCircuitsImage, new Date(2023, 5, 6)),
    new Paper("Prioritized Experience Replay", ["Tom Schaul", "John Quan", "Ioannis Antonoglou", "David Silver"], "https://arxiv.org/abs/1511.05952", prioritizedERImage, new Date(2023, 10, 7)),
    new Paper("Neural Discrete Representation Learning", ["Aaron van den Oord", "Oriol Vinyals", "Koray Kavukcuoglu"], "https://arxiv.org/abs/1711.00937", vqvaeImage, new Date(2024, 0, 9)),
    new Paper("Masked Autoencoders Are Scalable Vision Learners", ["Kaiming He", "Xinlei Chen", "Saining Xie", "Yanghao Li", "Piotr Dollár", "Ross Girshick"], "https://arxiv.org/abs/2111.06377", autoencodersLearnersImage, new Date(2023, 6, 11)),
    new Paper("Agent57: Outperforming the Atari Human Benchmark", ["Adrià Puigdomènech Badia", "Bilal Piot", "Steven Kapturowski", "Pablo Sprechmann", "Alex Vitvitskyi", "Daniel Guo", "Charles Blundell"], "https://arxiv.org/abs/2003.13350", agent57Image, new Date(2023, 11, 12)),
    new Paper("Dopamine and temporal difference learning - A fruitful relationship between neuroscience and AI", ["Will Dabney", "Zeb Kurth-Nelson"], "https://deepmind.google/discover/blog/dopamine-and-temporal-difference-learning-a-fruitful-relationship-between-neuroscience-and-ai/", dopamineImage, new Date(2023, 5, 13)),
    new Paper("A Distributional Perspective on Reinforcement Learning", ["Marc G. Bellemare", "Will Dabney", "Rémi Munos"], "https://arxiv.org/abs/1707.06887", distributionalPerspectiveImage, new Date(2023, 10, 15)),
    new Paper("Jukebox A Generative Model for Music", ["Prafulla Dhariwal", "Heewoo Jun", "Christine Payne", "Jong Wook Kim", "Alec Radford", "Ilya Sutskever"], "https://arxiv.org/abs/2005.00341", jukeboxImage, new Date(2024, 0, 16)),
    new Paper("RL-Duet - Online Music Accompaniment Generation Using Deep Reinforcement Learning", ["Nan Jiang", "Sheng Jin", "Zhiyao Duan", "Changshui Zhang"], "https://arxiv.org/abs/2002.03082", rlDuetImage, new Date(2023, 11, 19)),
    new Paper("Pattern-Based Music Generation with Wasserstein Autoencoders and PRC Descriptions", ["Valentijn Borghuis", "Luca Angioloni", "Lorenzo Brusci", "Paolo Frasconi"], "https://www.ijcai.org/Proceedings/2020/0751.pdf", patternMusicGenerationImage, new Date(2023, 5, 20)),
    new Paper("Human-level Control through Deep Reinforcement Learning", ["Volodymyr Mnih", "K. Kavukcuoglu", "David Silver", "Andrei A. Rusu", "J. Veness", "Marc G. Bellemare", "Alex Graves", "Martin A. Riedmiller", "A. Fidjeland", "Georg Ostrovski", "Stig Petersen", "Charlie Beattie", "Amir Sadik", "Ioannis Antonoglou", "Helen King", "D. Kumaran", "Daan Wierstra", "S. Legg", "D. Hassabis"], "https://www.nature.com/articles/nature14236", humanLevelControlImage, new Date(2023, 9, 22)),
    new Paper("High Fidelity Neural Audio Compression", ["Alexandre Défossez", "Jade Copet", "Gabriel Synnaeve", "Yossi Adi"], "https://arxiv.org/abs/2210.13438", neuralAudioCompressionImage, new Date(2023, 0, 23)),
    new Paper("Noisy Networks for Exploration", ["Meire Fortunato", "Mohammad Gheshlaghi Azar", "Bilal Piot", "Jacob Menick", "Ian Osband", "Alex Graves", "Vlad Mnih", "Remi Munos", "Demis Hassabis", "Olivier Pietquin", "Charles Blundell", "Shane Legg"], "https://arxiv.org/abs/1706.10295", noisyNetsImage, new Date(2023, 10, 24)),
    new Paper("Bytes is all you need", ["Maxwell Horton", "Sachin Mehta", "Ali Farhadi", "Mohammad Rastegari"], "https://arxiv.org/pdf/2306.00238.pdf", bytesIsAllYouNeedImage, new Date(2023, 5, 27)),
    new Paper("MusicLM: Generating Music From Text", ["Andrea Agostinelli", "Timo I. Denk", "Zalán Borsos", "Jesse Engel", "Mauro Verzetti", "Antoine Caillon", "Qingqing Huang", "Aren Jansen", "Adam Roberts", "Marco Tagliasacchi", "Matt Sharifi", "Neil Zeghidour", "Christian Frank"], "https://arxiv.org/abs/2301.11325", musicLMImage, new Date(2024, 0, 30)),
    new Paper("Dueling Network Architectures for Deep Reinforcement Learning", ["Ziyu Wang", "Tom Schaul", "Matteo Hessel", "Hado van Hasselt", "Marc Lanctot", "Nando de Freitas"], "https://arxiv.org/abs/1511.06581", duelingArchitecturesDRLImage, new Date(2023, 9, 30)),

    new Paper("Intriguing Properties of Contrastive Losses", ["Ting Chen", "Calvin Luo", "Lala Li"], "https://arxiv.org/abs/2011.02803", intriguingPropertiesContrastiveLossesImage, new Date(2024, 3, 23)),
    new Paper("Bootstrap your own latent: A new approach to self-supervised Learning", ["Jean-Bastien Grill", "Florian Strub", "Florent Altché", "Corentin Tallec", "Pierre H. Richemond", "Elena Buchatskaya", "Carl Doersch", "Bernardo Avila Pires", "Zhaohan Daniel Guo", "Mohammad Gheshlaghi Azar", "Bilal Piot", "Koray Kavukcuoglu", "Rémi Munos", "Michal Valko"], "https://arxiv.org/abs/2006.07733", bootstrapYourOwnLatentImage, new Date(2024, 3, 23)),

    new Paper("Emerging Properties in Self-Supervised Vision Transformers", ["Mathilde Caron", "Hugo Touvron", "Ishan Misra", "Hervé Jégou", "Julien Mairal", "Piotr Bojanowski", "Armand Joulin"], "https://arxiv.org/pdf/2104.14294.pdf", emergingPropertiesVisionTransformersImage, new Date(2024, 4, 7)),
    new Paper("Vision Transformers Need Registers", ["Timothée Darcet", "Maxime Oquab", "Julien Mairal", "Piotr Bojanowski"], "https://arxiv.org/pdf/2309.16588.pdf", visionTransformersNeedRegistersImage, new Date(2024, 4, 7)),

    new Paper("Self-Supervised Learning from Images with a Joint-Embedding Predictive Architecture", ["Mahmoud Assran", "Quentin Duval", "Ishan Misra", "Piotr Bojanowski", "Pascal Vincent", "Michael Rabbat", "Yann LeCun", "Nicolas Ballas"], "https://arxiv.org/pdf/2301.08243.pdf", selfSupervisedLearningImagesImage, new Date(2024, 4, 21)),
    new Paper("What do Self Supervised Vision Transformers Learn?", ["Namuk Park", "Wonjae Kim", "Byeongho Heo", "Taekyung Kim", "Sangdoo Yun"], "https://arxiv.org/pdf/2305.00729.pdf", whatDoSsvtLearnImage, new Date(2024, 4, 21)),

    new Paper("Revealing the Dark Secrets of Masked Image Modeling", ["Zhenda Xie", "Zigang Geng", "Jingcheng Hu", "Zheng Zhang", "Han Hu", "Yue Cao"], "https://arxiv.org/abs/2205.13543", revealingDarkSecretsImage, new Date(2024, 5, 4)),
    new Paper("Stochastic Gradient Descend", ["appliedprobability"], "https://appliedprobability.blog/2019/01/26/robbins-munro-2/", sgdImage, new Date(2024, 5, 4)),

    new Paper("Adding Gradient Noise Improves Learning for Very Deep Networks", ["Arvind Neelakantan", "Luke Vilnis", "Quoc V. Le", "Ilya Sutskever", "Lukasz Kaiser", "Karol Kurach", "James Martens"], "https://arxiv.org/pdf/1511.06807.pdf", addedGradientNoiseImage, new Date(2024, 5, 18)),
    new Paper("On the importance of initialization and momentum in deep learning", ["Ilya Sutskever", "James Martens", "George Dahl", "Geoffrey Hinton"], "https://proceedings.mlr.press/v28/sutskever13.html", importanceInitializationMomentumImage, new Date(2024, 5, 18)),

    new Paper("RMSProp", ["Geoffrey Hinton", "Nitish Srivastava", "Kevin Swersky"], "https://www.cs.toronto.edu/~tijmen/csc321/slides/lecture_slides_lec6.pdf", rmsPropImage, new Date(2024, 6, 2)),
    new Paper("Adam: A Method for Stochastic Optimization", ["Diederik P. Kingma", "Jimmy Ba"], "https://arxiv.org/abs/1412.6980", adamOptimizerImage, new Date(2024, 6, 2)),

    new Paper("Symbolic Discovery of Optimization Algorithms", ["Xiangning Chen", "Chen Liang", "Da Huang", "Esteban Real", "Kaiyuan Wang", "Yao Liu", "Hieu Pham", "Xuanyi Dong", "Thang Luong", "Cho-Jui Hsieh", "Yifeng Lu", "Quoc V. Le"], "https://arxiv.org/abs/2302.06675", symbolicOptimizationAlgorithmsImage, new Date(2024, 6, 16)),
    new Paper("VeLO: Training Versatile Learned Optimizers by Scaling Up", ["Luke Metz", "James Harrison", "C. Daniel Freeman", "Amil Merchant", "Lucas Beyer", "James Bradbury", "Naman Agrawal", "Ben Poole", "Igor Mordatch", "Adam Roberts", "Jascha Sohl-Dickstein"], "https://arxiv.org/abs/2211.09760", veloTrainingImage, new Date(2024, 6, 16)),
]

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
