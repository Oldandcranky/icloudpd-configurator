import React, { useMemo, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Info } from 'lucide-react'

const y = (s: string) => (s && /[:#\-]|^\s|\s$/.test(s) ? JSON.stringify(s) : s)

export default function App() {
  const [form, setForm] = useState({
    stackName: 'icloudpd',
    image: 'boredazfcuk/icloudpd:latest',
    tz: 'America/Chicago',
    puid: '1026',
    pgid: '100',
    umask: '022',
    configPath: '/volume1/docker/icloudpd/config',
    downloadPath: '/volume1/photo/icloudpd',
    jpegPath: '',
    appleId: '',
    cron: '0 */6 * * *',
    recentDays: 0,
    photoAlbum: 'All Photos',
    photoLibrary: 'All Photos',
    photoSize: 'original',
    convertHeic: true,
    downloadVideos: true,
    skipLivePhotos: false,
    setExifDate: true,
    autoDelete: false,
    folderStructure: '{:%Y/%m}',
    chmodFiles: '644',
    chmodDirs: '755',
    notifyUrl: '',
    logLevel: 'info',
    authType: 'password',
    username: '',
    password: '',
    authKeyPath: '',
  })

  const [advanced, setAdvanced] = useState<Array<{ key: string; value: string }>>([])

  const update = (k: keyof typeof form, v: any) => setForm(f => ({ ...f, [k]: v }))

  const composeYaml = useMemo(() => {
    const v = form
    return [
      "version: '3.8'",
      'services:',
      `  ${v.stackName}:`,
      `    image: ${v.image}`,
      `    container_name: ${v.stackName}`,
      '    restart: unless-stopped',
      '    environment:',
      `      TZ: ${y(v.tz)}`,
      `      PUID: ${y(v.puid)}`,
      `      PGID: ${y(v.pgid)}`,
      `      UMASK: ${y(v.umask)}`,
      `      CRON: ${y(v.cron)}`,
      '    volumes:',
      `      - ${y(v.configPath)}:/config`,
      `      - ${y(v.downloadPath)}:/home/boredazfcuk/iCloud`,
    ].join('\n')
  }, [form])

  const icloudpdConf = useMemo(() => {
    const v = form
    const kv = (k: string, val: any) => `${k}=${val}`
    const b = (bool: boolean) => (bool ? 'True' : 'False')
    const str = (s: string) => JSON.stringify(s ?? '')
    const conf = [
      kv('apple_id', v.appleId),
      kv('download_path', v.downloadPath),
      kv('jpeg_path', v.jpegPath || v.downloadPath),
      kv('recent_days', v.recentDays || 0),
      kv('photo_album', str(v.photoAlbum)),
      kv('photo_library', str(v.photoLibrary)),
      kv('photo_size', v.photoSize),
      kv('convert_heic_to_jpeg', b(v.convertHeic)),
      kv('download_videos', b(v.downloadVideos)),
      kv('skip_live_photos', b(v.skipLivePhotos)),
      kv('set_exif_datetime', b(v.setExifDate)),
      kv('auto_delete', b(v.autoDelete)),
      kv('folder_structure', str(v.folderStructure)),
      kv('file_chmod', v.chmodFiles),
      kv('directory_chmod', v.chmodDirs),
      kv('notification_url', str(v.notifyUrl || '')),
      kv('log_level', v.logLevel),
      kv('authentication_type', v.authType),
      kv('username', v.username),
      kv('password', v.password),
      kv('auth_key_path', v.authKeyPath),
    ]
    advanced.forEach(row => { if (row.key.trim()) conf.push(`${row.key}=${row.value}`) })
    return conf.join('\n')
  }, [form, advanced])

  const setupSteps = useMemo(() => [
    `# 1) Create host folders`,
    `mkdir -p ${form.configPath} ${form.downloadPath}`,
    '',
    '# 2) Save icloudpd.conf to /config',
    `cat > ${form.configPath}/icloudpd.conf <<'CONF'\n${icloudpdConf}\nCONF`,
    '',
    '# 3) docker compose up -d',
    '# 4) docker exec -it <container> sync-icloud.sh --Initialise',
  ].join('\n'), [icloudpdConf, form.configPath, form.downloadPath])

  const Field = ({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) => (
    <div style={{ display:'grid', gap:6 }}>
      <div style={{ display:'flex', alignItems:'center', gap:8 }}>
        <Label style={{ fontWeight:600 }}>{label}</Label>
        {hint && <span style={{ fontSize:12 }} className="muted"><Info size={12} style={{ verticalAlign:'-2px' }} /> {hint}</span>}
      </div>
      {children}
    </div>
  )

  return (
    <div className="container">
      <h1 style={{ fontSize:24, fontWeight:800, marginBottom:10 }}>iCloudPD Configurator</h1>
      <p className="muted" style={{ marginBottom:16 }}>Fill the fields, then copy docker-compose.yaml and icloudpd.conf from the tabs below.</p>

      <Card>
        <CardHeader><CardTitle>Basics</CardTitle></CardHeader>
        <CardContent>
          <div style={{ display:'grid', gap:12, gridTemplateColumns:'repeat(2, minmax(0, 1fr))' }}>
            <Field label="Stack Name"><Input value={form.stackName} onChange={(e) => update('stackName', e.target.value)} /></Field>
            <Field label="Image"><Input value={form.image} onChange={(e) => update('image', e.target.value)} /></Field>
            <Field label="Apple ID"><Input value={form.appleId} onChange={(e) => update('appleId', e.target.value)} /></Field>
            <Field label="Time Zone"><Input value={form.tz} onChange={(e) => update('tz', e.target.value)} /></Field>
            <Field label="PUID"><Input value={form.puid} onChange={(e) => update('puid', e.target.value)} /></Field>
            <Field label="PGID"><Input value={form.pgid} onChange={(e) => update('pgid', e.target.value)} /></Field>
            <Field label="UMASK"><Input value={form.umask} onChange={(e) => update('umask', e.target.value)} /></Field>
            <Field label="Config Path"><Input value={form.configPath} onChange={(e) => update('configPath', e.target.value)} /></Field>
            <Field label="Download Path"><Input value={form.downloadPath} onChange={(e) => update('downloadPath', e.target.value)} /></Field>
            <Field label="JPEG Path"><Input value={form.jpegPath} onChange={(e) => update('jpegPath', e.target.value)} /></Field>
          </div>
        </CardContent>
      </Card>

      <div style={{ height:12 }} />

      <Card>
        <CardHeader><CardTitle>Authentication</CardTitle></CardHeader>
        <CardContent>
          <div style={{ display:'grid', gap:12, gridTemplateColumns:'repeat(2, minmax(0, 1fr))' }}>
            <Field label="Auth Type" hint="password|key"><Input value={form.authType} onChange={(e) => update('authType', e.target.value)} /></Field>
            <Field label="Username"><Input value={form.username} onChange={(e) => update('username', e.target.value)} /></Field>
            <Field label="Password"><Input type="password" value={form.password} onChange={(e) => update('password', e.target.value)} /></Field>
            <Field label="Auth Key Path"><Input value={form.authKeyPath} onChange={(e) => update('authKeyPath', e.target.value)} /></Field>
          </div>
        </CardContent>
      </Card>

      <div style={{ height:12 }} />

      <Tabs defaultValue="compose" className="w-full">
        <TabsList>
          <TabsTrigger value="compose">docker-compose.yaml</TabsTrigger>
          <TabsTrigger value="conf">icloudpd.conf</TabsTrigger>
          <TabsTrigger value="steps">Setup steps</TabsTrigger>
        </TabsList>
        <TabsContent value="compose"><Textarea className="mono" style={{ height:300 }} value={composeYaml} readOnly /></TabsContent>
        <TabsContent value="conf"><Textarea className="mono" style={{ height:300 }} value={icloudpdConf} readOnly /></TabsContent>
        <TabsContent value="steps"><Textarea className="mono" style={{ height:300 }} value={setupSteps} readOnly /></TabsContent>
      </Tabs>
    </div>
  )
}
