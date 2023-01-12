export class Bug {
    public constructor(
        public id?: number,
        public key?: string,
        public link?: string,
        public assignee?: string,
        public component?: string,
        public creationDate?: string,
        public labels?: string,
        public priority?: number,
        public resolutionDate?: string | null,
        public status?: string,
        public summary?: string,
        public version?: number,
        public sla?: number,
        public slaColor?: string,
        public starCis?: string
    ) {}
}
