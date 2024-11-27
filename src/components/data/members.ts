import leoPin from "../../images/members/leo.jpeg"

export class Member {
    constructor(public name: string, public image: string, public link: string) { }
}

export const members = [
    new Member("Leo Pinetzki1", leoPin, "https://linked.in/leopinetzki"),
    new Member("Leo Pinetzki2", leoPin, "https://linked.in/leopinetzki"),
    new Member("Leo Pinetzki3", leoPin, "https://linked.in/leopinetzki"),
    new Member("Leo Pinetzki4", leoPin, "https://linked.in/leopinetzki"),
    new Member("Leo Pinetzki5", leoPin, "https://linked.in/leopinetzki"),
    new Member("Leo Pinetzki6", leoPin, "https://linked.in/leopinetzki"),
    new Member("Leo Pinetzki7", leoPin, "https://linked.in/leopinetzki"),
    new Member("Leo Pinetzki8", leoPin, "https://linked.in/leopinetzki"),
    new Member("Leo Pinetzki9", leoPin, "https://linked.in/leopinetzki"),
    /*new Member("Lorenz Hufe", "", ""),
    new Member("Justus Westerhof", "", ""),
    new Member("Arina Belova", "", ""),
    new Member("Jonas Loos", "", ""),
    new Member("Joseph Tschörner", "", ""),
    new Member("Duc ???", "", ""),
    new Member("Cederic Assman", "", ""),*/
]