-- Ajoute le document "Questions-réponses des candidats" pour l'édition 2.
--
-- Document privé : visible dans l'espace membres par les entreprises
-- membres de l'édition 2 (via la policy documents_select_private_members),
-- et transmis directement par e-mail aux producteurs candidats — comme le
-- règlement de consultation et le Term Sheet, il n'est pas publié en clair
-- sur le site public, conformément à l'obligation de confidentialité de
-- l'article 7 du règlement de consultation.

insert into public.documents (title, programme_id, visibility, category, file_url, description, updated_at)
values (
  'Questions-réponses des candidats producteurs',
  'prog-2',
  'private',
  'faq',
  '#',
  'Questions posées par les candidats producteurs et réponses de l''AMO (calendrier, éligibilité Brownfield, volumes, prix, clauses du Term Sheet, garanties, responsable d''équilibre), communiquées à l''ensemble des candidats conformément à l''article 4.2 du règlement de consultation.',
  '2026-07-24'
);
