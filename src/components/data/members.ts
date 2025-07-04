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


export class Member {
    constructor(public name: string, public surname: string, public image: string, public link: string | null) { }
}

export const members = [
    new Member("Justus", "Westerhoff", justus, "https://www.linkedin.com/in/justus-westerhoff/"),
    new Member("Cederic", "Aßmann", cederic, "https://www.linkedin.com/in/cederic-a%C3%9Fmann-41904322b"),
    new Member("Jonas", "Loos", jonas, "https://www.linkedin.com/in/jonas-loos/"),
    new Member("Joseph", "Tschörner", joseph, "https://www.linkedin.com/in/joseph-tsch%C3%B6rner-12818427a/"),
    new Member("Mia", "Prokopovych ", mia, "https://www.linkedin.com/in/mia-prokopovych-9aaa26302"),
    new Member("Duc", "Hoang", duc, "https://www.linkedin.com/in/ly-duc-hoang/"),
    new Member("Arina", "Belova", arina, "https://www.linkedin.com/in/a-belova"),
    new Member("Lorenz", "Hufe", lorenz, "https://www.linkedin.com/in/lorenz-hufe"),
    new Member("Philippa", "Ringe", philipa, null),
    new Member("Tom", "Neuhäuser", tom, "https://www.linkedin.com/in/tomneuhaeuser/"),
    new Member("Marvin", "Beese", marvin, "https://www.linkedin.com/in/marvin-beese/"),
    new Member("Leo", "Pinetzki", leo, "https://www.linkedin.com/in/leo-pinetzki/"),
]
