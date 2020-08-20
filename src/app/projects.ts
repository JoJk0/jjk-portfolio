export class Projects {

    id: number;
    title: string;
    date: Date;
    coAuthors: Array<any>;
    images: Array<string>;
    description: string;
    typography: Array<Object>;
    colourPalette: Array<Object>;
    colours: {
        background: string,
        panelBg: string,
        text: string,
        topTitleLeft: string,
        topTitleRight: string,
        buttons: string
    };
    keywords: Array<string>;
    liveURL: string;
    copyURL: string;
    reportURL: string;
    githubURL: string;
    dribbbleURL: string;
    showcasePos: number;

    constructor(id, title, date, coAuthors, images, description, typography, colourPalette, colours, keywords, liveURL, copyURL, reportURL, githubURL, dribbbleURL, showcasePos){
        this.id = id;
        this.title = title;
        this.date = date;
        this.coAuthors = coAuthors;
        this.images = images;
        this.description = description;
        this.typography = typography;
        this.colourPalette = colourPalette;
        this.colours = {
            background: colours.background,
            panelBg:  colours.panelBg,
            text: colours.text,
            topTitleLeft: colours.topTitleLeft,
            topTitleRight: colours.topTitleRight,
            buttons: colours.buttons
        };
        this.keywords = keywords;
        this.liveURL = liveURL;
        this.copyURL = copyURL;
        this.reportURL = reportURL;
        this.githubURL = githubURL;
        this.dribbbleURL = dribbbleURL;
        this.showcasePos = showcasePos;
    }
}
