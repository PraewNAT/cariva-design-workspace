# Core Storybook coverage

39/39 modules have dedicated stories and are registered in the live Storybook. Subcomponents are composed in the parent's examples; this is not confirmation that every variant/state is covered. Static examples disable Controls and show the source JSX and the prop table of the real component.

| Module | Storybook | Stories |
|---|---|---|
| accordion | [Core/Components/Accordion](http://localhost:6006/?path=/story/core-components-accordion--default) | 1 |
| alert | [Core/Components/Alert](http://localhost:6006/?path=/story/core-components-alert--default) | 1 |
| avatar | [Core/Components/Avatar](http://localhost:6006/?path=/story/core-components-avatar--default) | 6 |
| badge | [Core/Components/Badge](http://localhost:6006/?path=/story/core-components-badge--default) | 6 |
| breadcrumb | [Core/Components/Breadcrumb](http://localhost:6006/?path=/story/core-components-breadcrumb--default) | 1 |
| button | [Core/Components/Button](http://localhost:6006/?path=/story/core-button--default) | 9 |
| calendar | [Core/Components/Calendar](http://localhost:6006/?path=/story/core-components-calendar--default) | 1 |
| card | [Core/Components/Card](http://localhost:6006/?path=/story/core-components-card--default) | 10 |
| chart | [Core/Components/Chart](http://localhost:6006/?path=/story/core-components-chart--bar-example) | 10 |
| checkbox | [Core/Components/Checkbox](http://localhost:6006/?path=/story/core-components-checkbox--default) | 5 |
| combobox | [Core/Components/Combobox](http://localhost:6006/?path=/story/core-components-combobox--default) | 7 |
| dialog | [Core/Components/Dialog](http://localhost:6006/?path=/story/core-components-dialog--default) | 1 |
| dropdown-menu | [Core/Components/Dropdown Menu](http://localhost:6006/?path=/story/core-components-dropdown-menu--default) | 1 |
| empty | [Core/Components/Empty](http://localhost:6006/?path=/story/core-components-empty--default) | 1 |
| input field composition | [Core/Components/Input/Field](http://localhost:6006/?path=/story/core-components-input-field--default) | 1 |
| input-group | [Core/Components/Input/Input Group](http://localhost:6006/?path=/story/core-components-input-input-group--default) | 1 |
| input-otp | [Core/Components/Input/Input Otp](http://localhost:6006/?path=/story/core-components-input-input-otp--default) | 1 |
| input | [Core/Components/Input](http://localhost:6006/?path=/story/core-components-input--default) | 3 |
| label | [Core/Components/Input/Label](http://localhost:6006/?path=/story/core-components-input-label--default) | 1 |
| pagination | [Core/Components/Pagination](http://localhost:6006/?path=/story/core-components-pagination--default) | 1 |
| popover | [Core/Components/Popover](http://localhost:6006/?path=/story/core-components-popover--default) | 1 |
| progress | [Core/Components/Progress](http://localhost:6006/?path=/story/core-components-progress--default) | 1 |
| radio-group | [Core/Components/Radio Group](http://localhost:6006/?path=/story/core-components-radio-group--default) | 1 |
| scroll-area | [Core/Components/Scroll Area](http://localhost:6006/?path=/story/core-components-scroll-area--default) | 1 |
| dropdown (Select primitive) | [Core/Components/Dropdown](http://localhost:6006/?path=/story/core-components-dropdown--default) | 1 |
| separator | [Core/Components/Separator](http://localhost:6006/?path=/story/core-components-separator--default) | 1 |
| sheet | [Core/Components/Sheet](http://localhost:6006/?path=/story/core-components-sheet--default) | 7 |
| sidebar | [Core/Components/Sidebar](http://localhost:6006/?path=/story/core-components-sidebar--default) | 1 |
| skeleton | [Core/Components/Skeleton](http://localhost:6006/?path=/story/core-components-skeleton--default) | 1 |
| slider | [Core/Components/Slider](http://localhost:6006/?path=/story/core-components-slider--default) | 1 |
| spinner | [Core/Components/Spinner](http://localhost:6006/?path=/story/core-components-spinner--default) | 1 |
| switch | [Core/Components/Switch](http://localhost:6006/?path=/story/core-components-switch--default) | 1 |
| table | [Core/Components/Table](http://localhost:6006/?path=/story/core-components-table--default) | 1 |
| tabs | [Core/Components/Tabs](http://localhost:6006/?path=/story/core-components-tabs--default) | 1 |
| textarea | [Core/Components/Textarea](http://localhost:6006/?path=/story/core-components-textarea--default) | 3 |
| toast | [Core/Components/Toast](http://localhost:6006/?path=/story/core-components-toast--default) | 1 |
| toggle-group | [Core/Components/Toggle Group](http://localhost:6006/?path=/story/core-components-toggle-group--default) | 1 |
| toggle | [Core/Components/Toggle](http://localhost:6006/?path=/story/core-components-toggle--default) | 1 |
| tooltip | [Core/Components/Tooltip](http://localhost:6006/?path=/story/core-components-tooltip--default) | 1 |

Component examples now share one `Core/Components/<name>` entry, including compositions. Card has10stories, Checkbox5 and Chart10. Stepper, Rating, File Upload and Date Time Picker each have their own component entry. The Date Picker, Time Picker and Date Time Picker groups are nested under `Core/Components/Date & Time`. There are43component groups:39UI modules plus4composed components. The39/39script measures UI module file coverage only. See STORYBOOK-ORGANIZATION.md.
