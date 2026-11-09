/** Only real, source-verified photos are shown in project galleries. */
export function getProjectSteps(project) {
  if (!project) return [];
  const photos = project.photos?.length ? project.photos : [{ image: project.image, label: 'Risultato', alt: project.alt }];
  return photos.map((photo, index) => ({
    id: 'photo-' + index,
    number: String(index + 1).padStart(2, '0'),
    short: photo.label,
    title: photo.label,
    image: photo.image,
    alt: photo.alt || project.alt,
  }));
}

export function getProjectImage(project, stepId) {
  return getProjectSteps(project).find(photo => photo.id === stepId)?.image || null;
}
