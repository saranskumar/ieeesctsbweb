export * from "./members";
export { execom25 as execom, sbcTeams25 as sbcTeams } from "./team25";
import { execom25, sbcTeams25 } from "./team25";

// Default export for backwards compatibility
export default { execom: execom25, sbcTeams: sbcTeams25 };
