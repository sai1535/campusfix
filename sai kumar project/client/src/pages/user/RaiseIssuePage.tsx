import { IssueForm } from "../../components/IssueForm";

const RaiseIssuePage = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-semibold text-gray-900">Raise Problem</h1>
    <p className="text-gray-500">
      Provide detailed information to help the admin team resolve faster.
    </p>
    <IssueForm />
  </div>
);

export default RaiseIssuePage;


