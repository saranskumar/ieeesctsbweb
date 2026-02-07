export * from "./team25";
export { execom25 as execom, sbcTeams25 as sbcTeams } from "./team25";
import { execom25, sbcTeams25 } from "./team25";

// Default export if needed, mostly for backwards compatibility if any strict default imports exist
export default { execom: execom25, sbcTeams: sbcTeams25 };
