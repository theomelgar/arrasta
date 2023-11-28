import { OrgControl } from "./_components/org-control";

const OrganizationIdLayout = ({
  children
}:{
  children:  React.ReactNode
})=>{
  return (
      <div className="felx gap-x-7">
        <OrgControl/>
          {children}
      </div>
  );
};

export default OrganizationIdLayout;