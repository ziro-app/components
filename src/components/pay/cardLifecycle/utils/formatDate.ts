export default (unformattedDate: string) => new Date(unformattedDate).toISOString().split("T")[0].split("-").reverse().join("/");
