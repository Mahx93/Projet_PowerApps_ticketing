import { Office365GroupsService } from '../generated/services/Office365GroupsService';

// Groupe de sécurité Entra "HelpDesk - Responsables" — contrôle l'accès au
// tableau de bord Responsable dans la Code App.
const RESPONSABLES_GROUP_ID = 'd92fc3fb-afae-4bce-969e-88c59ef0c909';

export async function isResponsable(userPrincipalName: string): Promise<boolean> {
  if (!userPrincipalName) return false;
  const result = await Office365GroupsService.ListGroupMembers(RESPONSABLES_GROUP_ID);
  const members = result.data?.value ?? [];
  return members.some(
    (member) => member.userPrincipalName?.toLowerCase() === userPrincipalName.toLowerCase(),
  );
}
