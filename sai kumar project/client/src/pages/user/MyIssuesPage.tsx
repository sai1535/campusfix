import { IssueListCard } from "../../components/IssueListCard";
import { userIssues } from "../../data/mockIssues";

const MyIssuesPage = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-semibold text-gray-900">My Problems</h1>
    <IssueListCard items={userIssues} />
  </div>
);

export default MyIssuesPage;


