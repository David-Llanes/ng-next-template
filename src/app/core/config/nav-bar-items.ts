export interface MenuItem {
  url: string;
  key: string;
  icon: string;
  routerLink?: string;
  isLink?: boolean;
  items?: MenuItem[];
}

export interface NavigationGroup {
  sectionKey: string;
  items: MenuItem[];
}

export const NAVIGATION_GROUPS: NavigationGroup[] = [
  {
    sectionKey: 'Aplicacion',
    items: [
      {
        url: 'admin',
        key: 'navigation.admin',
        icon: 'fas fa-user-cog',
        items: [
          {
            url: 'admin/laboratory',
            key: 'navigation.laboratory',
            icon: 'fas fa-flask',
            items: [
              {
                routerLink: 'admin/laboratory/analyses',
                url: 'admin/laboratory/analyses',
                key: 'navigation.laboratory-analyses',
                icon: 'fas fa-vial',
                isLink: true,
              },
              {
                routerLink: 'admin/laboratory/profiles',
                url: 'admin/laboratory/profiles',
                key: 'navigation.laboratory-profiles',
                icon: 'fas fa-vials',
                isLink: true,
              },
            ],
          },
        ],
      },
      {
        url: 'patient',
        key: 'navigation.patient',
        icon: 'fa-solid fa-hospital-user',
        items: [
          {
            url: 'patient/patient-records',
            routerLink: 'patient/patient-records',
            key: 'navigation.patient-patient-records',
            icon: 'fa-solid fa-book',
            isLink: true,
          },
          {
            url: 'patient/medical-notes',
            routerLink: 'patient/medical-notes',
            key: 'navigation.patient-medical-notes',
            icon: 'fa-solid fa-note-sticky',
            isLink: true,
          },
          {
            url: 'patient/clinical-history',
            routerLink: 'patient/clinical-history',
            key: 'navigation.patient-clinical-history',
            icon: 'fa-solid fa-book-medical',
            isLink: true,
          },
        ],
      },
      {
        url: 'hemodialysis',
        key: 'navigation.hemodialysis',
        icon: 'fas fa-droplet',
        items: [
          {
            url: 'hemodialysis/patient',
            key: 'navigation.hemodialysis-patient',
            icon: 'fas fa-user-injured',
            items: [
              {
                routerLink: 'hemodialysis/patient/sessions',
                url: 'hemodialysis/patient/sessions',
                key: 'navigation.hemodialysis-sessions',
                icon: 'fas fa-calendar-check',
                isLink: true,
              },
              {
                routerLink: 'hemodialysis/patient/laboratories',
                url: 'hemodialysis/patient/laboratories',
                key: 'navigation.hemodialysis-laboratories',
                icon: 'fas fa-vials',
                isLink: true,
              },
              {
                url: 'hemodialysis/patient/laboratories/new',
                key: 'generics.labels.new',
                icon: 'fa-solid fa-plus',
              },
            ],
          },
          {
            routerLink: 'hemodialysis/configuration',
            url: 'hemodialysis/configuration',
            key: 'navigation.hemodialysis-configuration',
            icon: 'fas fa-cogs',
            items: [
              {
                routerLink: 'hemodialysis/configuration/laboratory',
                url: 'hemodialysis/configuration/laboratory',
                key: 'navigation.hemodialysis-laboratory',
                icon: 'fas fa-flask',
                isLink: true,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    sectionKey: 'Administracion',
    items: [
      {
        url: 'catalogs',
        key: 'navigation.catalogs',
        icon: 'fas fa-folder-open',
        items: [
          {
            routerLink: 'catalogs/administration-routes',
            url: 'catalogs/administration-routes',
            key: 'navigation.catalogs-administration-routes',
            icon: 'fas fa-map',
            isLink: true,
          },
          {
            routerLink: 'catalogs/allergies',
            url: 'catalogs/allergies',
            key: 'navigation.catalogs-allergies',
            icon: 'fas fa-hand-dots',
            isLink: true,
          },
          {
            routerLink: 'catalogs/bacteria',
            url: 'catalogs/bacteria',
            key: 'navigation.catalogs-bacteria',
            icon: 'fas fa-bacterium',
            isLink: true,
          },
          {
            routerLink: 'catalogs/blood-types',
            url: 'catalogs/blood-types',
            key: 'navigation.catalogs-blood-types',
            icon: 'fas fa-tint',
            isLink: true,
          },
          {
            routerLink: 'catalogs/data-types',
            url: 'catalogs/data-types',
            key: 'navigation.catalogs-data-types',
            icon: 'fas fa-database',
            isLink: true,
          },
          {
            routerLink: 'catalogs/diagnoses',
            url: 'catalogs/diagnoses',
            key: 'navigation.catalogs-diagnoses',
            icon: 'fas fa-stethoscope',
            isLink: true,
          },
          {
            routerLink: 'catalogs/educational-attainments',
            url: 'catalogs/educational-attainments',
            key: 'navigation.catalogs-educational-attainments',
            icon: 'fas fa-graduation-cap',
            isLink: true,
          },
          {
            routerLink: 'catalogs/genders',
            url: 'catalogs/genders',
            key: 'navigation.catalogs-genders',
            icon: 'fas fa-venus-mars',
            isLink: true,
          },
          {
            routerLink: 'catalogs/insurance-provider-types',
            url: 'catalogs/insurance-provider-types',
            key: 'navigation.catalogs-insurance-provider-types',
            icon: 'fas fa-shield-alt',
            isLink: true,
          },
          {
            routerLink: 'catalogs/insurance-providers',
            url: 'catalogs/insurance-providers',
            key: 'navigation.catalogs-insurance-providers',
            icon: 'fas fa-hospital-user',
            isLink: true,
          },
          {
            routerLink: 'catalogs/kinships',
            url: 'catalogs/kinships',
            key: 'navigation.catalogs-kinships',
            icon: 'fas fa-people-arrows',
            isLink: true,
          },
          {
            routerLink: 'catalogs/loincs',
            url: 'catalogs/loincs',
            key: 'navigation.catalogs-loincs',
            icon: 'fas fa-code',
            isLink: true,
          },
          {
            routerLink: 'catalogs/magnitudes',
            url: 'catalogs/magnitudes',
            key: 'navigation.catalogs-magnitudes',
            icon: 'fas fa-ruler-combined',
            isLink: true,
          },
          {
            routerLink: 'catalogs/marital-statuses',
            url: 'catalogs/marital-statuses',
            key: 'navigation.catalogs-marital-statuses',
            icon: 'fas fa-ring',
            isLink: true,
          },
          {
            routerLink: 'catalogs/measurement-units',
            url: 'catalogs/measurement-units',
            key: 'navigation.catalogs-measurement-units',
            icon: 'fas fa-balance-scale',
            isLink: true,
          },
          {
            routerLink: 'catalogs/occupations',
            url: 'catalogs/occupations',
            key: 'navigation.catalogs-occupations',
            icon: 'fas fa-briefcase',
            isLink: true,
          },
          {
            routerLink: 'catalogs/procedure-types',
            url: 'catalogs/procedure-types',
            key: 'navigation.catalogs-procedure-types',
            icon: 'fas fa-procedures',
            isLink: true,
          },
          {
            routerLink: 'catalogs/procedures',
            url: 'catalogs/procedures',
            key: 'navigation.catalogs-procedures',
            icon: 'fas fa-file-medical',
            isLink: true,
          },
          {
            routerLink: 'catalogs/religions',
            url: 'catalogs/religions',
            key: 'navigation.catalogs-religions',
            icon: 'fas fa-pray',
            isLink: true,
          },
          {
            routerLink: 'catalogs/symptom-types',
            url: 'catalogs/symptom-types',
            key: 'navigation.catalogs-symptom-types',
            icon: 'fas fa-thermometer',
            isLink: true,
          },
          {
            routerLink: 'catalogs/symptoms',
            url: 'catalogs/symptoms',
            key: 'navigation.catalogs-symptoms',
            icon: 'fas fa-head-side-cough',
            isLink: true,
          },
        ],
      },
      {
        routerLink: 'organization',
        url: 'organization',
        key: 'navigation.organizations',
        icon: 'fas fa-building',
        items: [
          {
            routerLink: 'organization/wizard',
            url: 'organization/wizard',
            key: 'Wizard (temporal)',
            icon: 'fa-solid fa-hat-wizard',
            isLink: true,
          },
          {
            routerLink: 'organization/configuration',
            url: 'organization/configuration',
            key: 'Configuration i18n',
            icon: 'fa-solid fa-hospital',
            isLink: true,
          },
        ],
      },
    ],
  },
];
