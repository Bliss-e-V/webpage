import leoPin from "../../images/members/leo.jpeg"

export class Member {
    constructor(public name: string, public image: string, public link: string) { }
}

export const members = [
    new Member("Justus Westerhoff", leoPin, "https://www.linkedin.com/in/justus-westerhoff/"),
    new Member("Cederic Aßmann", leoPin, "https://www.linkedin.com/in/cederic-a%C3%9Fmann-41904322b"),
    new Member("Jonas Loos", leoPin, "https://www.linkedin.com/in/jonas-loos/"),
    new Member("Joseph Tschörner", leoPin, "https://www.linkedin.com/in/joseph-tsch%C3%B6rner-12818427a/"),
    new Member("Mia Prokopovych ", leoPin, "https://www.linkedin.com/in/mia-prokopovych-9aaa26302"),
    new Member("Duc Hoang", leoPin, "https://www.linkedin.com/in/ly-duc-hoang/"),
    new Member("Leo Pinetzki", leoPin, "https://www.linkedin.com/in/leo-pinetzki/"),
]