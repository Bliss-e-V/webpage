import leo from "../../images/members/leo.png"
import cederic from "../../images/members/cederic.png"
import arina from "../../images/members/arina.png"
import joseph from "../../images/members/joseph.png"
import justus from "../../images/members/justus.png"
import mia from "../../images/members/mia.png"
import jonas from "../../images/members/jonas.png"
import lorenz from "../../images/members/lorenz.png"
import philipa from "../../images/members/philipa.png"
import josi from "../../images/members/josi.png"
import tom from "../../images/members/tom.png"
import marvin from "../../images/members/marvin.png"
import duc from "../../images/members/duc.png"
import adwaith from "../../images/members/adwaith.png"
import sevval from "../../images/members/sevval.png"
import enes from "../../images/members/enes.png"
import omar from "../../images/members/omar.png"
import ardian from "../../images/members/ardian.png"
import chyngyz from "../../images/members/chyngyz.png"
import nina from "../../images/members/nina.png"
import shairal from "../../images/members/shairal.png"
import anna from "../../images/members/anna.png"
import jan from "../../images/members/jan.png"
import jarek from "../../images/members/jarek.png"
import type { ImageMetadata } from "astro";

export class Member {
    constructor(public name: string, public surname: string, public image: ImageMetadata | string | null, public link: string | null) { }
}

// Current members (active)
export const currentMembers = [
    new Member("Justus", "Westerhoff", justus, "https://www.linkedin.com/in/justus-westerhoff/"),
    new Member("Cederic", "Aßmann", cederic, "https://www.linkedin.com/in/cederic-a%C3%9Fmann-41904322b"),
    new Member("Jonas", "Loos", jonas, "https://www.linkedin.com/in/jonas-loos/"),
    new Member("Joseph", "Tschörner", joseph, "https://www.linkedin.com/in/joseph-tsch%C3%B6rner-12818427a/"),
    new Member("Duc", "Hoang", duc, "https://www.linkedin.com/in/ly-duc-hoang/"),
    new Member("Arina", "Belova", arina, "https://www.linkedin.com/in/a-belova"),
    new Member("Lorenz", "Hufe", lorenz, "https://www.linkedin.com/in/lorenz-hufe"),
    new Member("Tom", "Neuhäuser", tom, "https://www.linkedin.com/in/tomneuhaeuser/"),
    new Member("Marvin", "Beese", marvin, "https://www.linkedin.com/in/marvin-beese/"),
    new Member("Leo", "Pinetzki", leo, "https://www.linkedin.com/in/leo-pinetzki/"),
    new Member("Adwaith", "Venkatesh Gautham", adwaith, "https://www.linkedin.com/in/adwaithgautham/"),
    new Member("Sevval", "Goelbasi", sevval, "https://www.linkedin.com/in/sevval-goelbasi-662712311/"),
    new Member("Enes", "Erdem Erdogan", enes, "https://www.linkedin.com/in/eneserdemerd/"),
    new Member("Omar", "Sherif", omar, null),
    new Member("Ardian", "Begisholli", ardian, "https://www.linkedin.com/in/ardian-begisholli-38a070304/"),
    new Member("Chyngyz", "Kojonazarov", chyngyz, "https://www.linkedin.com/in/chyngyz-kojonazarov-87821b219/"),
    new Member("Nina", "Zukowska", nina, "https://www.linkedin.com/in/nina-zukowska/"),
    new Member("Shairal", "Sharma", shairal, "https://www.linkedin.com/in/shairal-om-sharma-409590188/"),
    new Member("Anna", "Tils", anna, "https://www.linkedin.com/in/anna-tils-0759b3312/"),
    new Member("Maja", "Kosiarski", null, "https://www.linkedin.com/in/maja-kosiarski-227194297/"),
]

// Alumni members (past members)
export const alumniMembers = [
    new Member("Jan", "Tiegges", jan, "https://www.linkedin.com/in/jan-tiegges/"),
    new Member("Mia", "Prokopovych", mia, "https://www.linkedin.com/in/mia-prokopovych-9aaa26302"),
    new Member("Jarek", "Liesen", jarek, "https://www.linkedin.com/in/jarek-liesen/"),
    new Member("Josephine", "Egerer", josi, "https://www.linkedin.com/in/josephine-egerer/"),
    new Member("Jakob", "Hackstein", null, "https://www.linkedin.com/in/jakob-hackstein-5a1167281/"),
    new Member("Felix", "Ringe", null, "https://www.linkedin.com/in/felix-ringe/"),
    new Member("Philippa", "Ringe", philipa, null),
    new Member("Gabriele", "Inciuraite", null, null),
    new Member("Haci Mustafa", "Suman", null, null),
    new Member("Ingimar", "Tomasson", null, null),
    new Member("Iman", "Modarressi Tehrani", null, null),
]

// Legacy export for backward compatibility (current members only)
export const members = currentMembers
